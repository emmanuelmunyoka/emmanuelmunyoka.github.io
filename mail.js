const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Configuration CORS pour permettre les requêtes depuis le frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'emmanuelmunyoka79@gmail.com',
        pass: 'cnpc uvob gzfg zrzz'
    }
});

// Vérifier la connexion au serveur SMTP
transporter.verify((error, success) => {
    if (error) {
        console.log('Erreur de connexion:', error);
    } else {
        console.log('Serveur prêt à envoyer des emails');
    }
});



// Route pour afficher le formulaire
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'kitendi.html'));
});

// Route pour gérer l'envoi d'email
app.post('/send-email', async (req, res) => {
    console.log('=== DÉBUT REQUÊTE EMAIL ===');
    console.log('Corps de la requête reçu:', req.body);
    console.log('Headers:', req.headers);

    try {
        // Template HTML pour l'email
        const emailTemplate = (subject, message, taille) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Montserrat', Arial, sans-serif;
            background: #f4f6fb;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(44,62,80,0.10);
            overflow: hidden;
            border: 1px solid #e6e8ec;
        }
        .header {
            background: linear-gradient(90deg, #1a1a2e 0%, #16213e 100%);
            color: #fff;
            padding: 32px 24px 16px 24px;
            text-align: center;
        }
        .header h1 {
            margin: 0 0 8px 0;
            font-size: 2rem;
            letter-spacing: 2px;
            font-family: 'Montserrat', Arial, sans-serif;
        }
        .header .brand {
            font-size: 1.1rem;
            font-weight: 700;
            letter-spacing: 1px;
            color: #ffd700;
        }
        .content {
            padding: 32px 24px 24px 24px;
            color: #222;
        }
        .content p {
            font-size: 1.1rem;
            margin: 12px 0;
        }
        .footer {
            background: #f4f6fb;
            color: #888;
            text-align: center;
            padding: 18px 0;
            font-size: 0.95rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="brand">Kitendi Kouture</div>
            <h1>Nouveau Message Produit</h1>
        </div>
        <div class="content">
            <p><strong>Produit :</strong> ${subject}</p>
            <p><strong>Prix :</strong> ${message}</p>
            <p><strong>Taille choisie :</strong> ${taille ? taille : 'Non précisée'}</p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Kitendi Kouture. Tous droits réservés.
        </div>
    </div>
</body>
</html>
`;
        const { subject, message, taille } = req.body;

        console.log('Données extraites:', { subject, message, taille });

        if (!subject || !message) {
            console.log('ERREUR: Sujet ou message manquant');
            return res.status(400).send('Le sujet et le message sont requis');
        }

        const mailOptions = {
            from: 'emmanuelmunyoka79@gmail.com',
            to: 'emmanuelmunyoka79@icloud.com',
            subject: subject,
            html: emailTemplate(subject, message, taille)
        };

        console.log('Options email préparées:', mailOptions);
        console.log('Tentative d\'envoi...');

        const result = await transporter.sendMail(mailOptions);
        console.log('Email envoyé avec succès!');
        console.log('Résultat:', result);
        console.log('=== FIN REQUÊTE EMAIL (SUCCÈS) ===');
        
        res.status(200).send('Email envoyé avec succès!');
        
    } catch (error) {
        console.error('=== ERREUR LORS DE L\'ENVOI ===');
        console.error('Type d\'erreur:', error.constructor.name);
        console.error('Message d\'erreur:', error.message);
        console.error('Code d\'erreur:', error.code);
        console.error('Stack trace:', error.stack);
        console.error('=== FIN ERREUR ===');
        
        res.status(500).send('Erreur lors de l\'envoi de l\'email: ' + error.message);
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 1200;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log('http://localhost/send-email')
});