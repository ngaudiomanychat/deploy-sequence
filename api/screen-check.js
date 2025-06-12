import fs from 'fs';

export default function handler(req, res) {
  try {
    const signalFile = '/tmp/redirect-signal.json';
    
    // Check if signal file exists
    if (fs.existsSync(signalFile)) {
      const signal = JSON.parse(fs.readFileSync(signalFile, 'utf8'));
      
      // Delete the file so it only triggers once
      fs.unlinkSync(signalFile);
      
      res.status(200).json({
        redirect: true,
        message: 'Redirect triggered!',
        timestamp: signal.timestamp
      });
    } else {
      res.status(200).json({
        redirect: false,
        message: 'No redirect signal'
      });
    }
  } catch (error) {
    console.error('Screen check error:', error);
    res.status(500).json({ 
      redirect: false, 
      error: 'Server error' 
    });
  }
}
