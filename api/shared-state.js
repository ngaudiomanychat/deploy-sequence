// Shared state between API endpoints
let lastDeployment = null;
let processedDeployments = new Set();

export function setDeployment(deployment) {
  lastDeployment = deployment;
  console.log('📦 Deployment stored:', deployment.id);
}

export function getDeployment() {
  return lastDeployment;
}

export function markAsProcessed(id) {
  processedDeployments.add(id);
  console.log('✅ Marked as processed:', id);
}

export function isProcessed(id) {
  return processedDeployments.has(id);
}
