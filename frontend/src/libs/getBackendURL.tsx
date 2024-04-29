export default function getBackendURL() {
  let backendUrl = process.env.BACKEND_URL || "";
  if (backendUrl != "") return backendUrl;
  try {
    backendUrl = window.location.origin;
    if (window.location.origin === "http://localhost:3000") backendUrl = "http://localhost:5000";
  } catch {
    backendUrl = ""
  }
  if (backendUrl == "") {
    backendUrl = "https://cedt-se-project-raonow.vercel.app"
  } 
  return backendUrl;
}