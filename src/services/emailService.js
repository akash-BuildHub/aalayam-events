import emailjs from '@emailjs/browser';

// EmailJS keys
const SERVICE_ID = import.meta.env?.VITE_EMAILJS_SERVICE_ID || 'service_40ze8bj';
const TEMPLATE_ID = import.meta.env?.VITE_EMAILJS_TEMPLATE_ID || 'template_7utknsh';
const PUBLIC_KEY = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY || 'b2oSbBGJrKlMOw38i';

/**
 * Sends a booking form email using EmailJS.
 * 
 * @param {Object} formData The form data to send.
 * @returns {Promise<any>} A promise that resolves to { success: boolean, response?: any, error?: any }.
 */
export const sendBookingEmail = async (formData) => {
    try {
        const templateParams = {
            from_name: formData.name,
            reply_to: formData.email,
            phone: formData.phone,
            service_type: formData.service,
            date: formData.date,
            time: formData.time,
            message: formData.message,
            to_email: 'jsjerinabishek2002@gmail.com', // Destination email
        };

        const response = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            templateParams,
            PUBLIC_KEY
        );

        return { success: true, response };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error };
    }
};
