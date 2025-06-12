export default function handler(req, res) {
  try {
    // Check if there's a redirect signal
    if (global.redirectSignal && global.redirectSignal.triggered) {
      // Clear the signal so it only triggers once
      global.redirectSignal.triggered = false;
      
      res.status(200).json({
        redirect: true,
        message: 'Redirect triggered!'
      });
    } else {
      res.status(200).json({
        redirect: false,
        message: 'No redirect signal'
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
