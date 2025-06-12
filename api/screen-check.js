import { getDeployment, markAsProcessed, isProcessed } from './shared-state.js';

export default function handler(req, res) {
  try {
    const deployment = getDeployment();
    
    if (deployment && !isProcessed(deployment.id)) {
      markAsProcessed(deployment.id);
      
      console.log(`📺 Screen redirect triggered: ${deployment.id}`);
      
      res.status(200).json({
        redirect: true,
        deployment: deployment,
        message: 'Redirect triggered!'
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
