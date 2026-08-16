export const CONTACT = {
  // Replace these with your actual details
  email: "humayun.mirzaa1@gmail.com", 
  phone: "+923316814569", // Include your country code
  linkedin: "https://www.linkedin.com/in/humayun3676" 
};

export const getWhatsAppLink = () => {
  // This cleans the phone number and creates a direct WhatsApp chat link
  const cleanPhone = CONTACT.phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}`;
};

export const getEmailLink = () => {
  return `mailto:${CONTACT.email}`;
};