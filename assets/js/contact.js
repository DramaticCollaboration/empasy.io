document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            // UI Feedback: Loading state
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';
            
            // Gather form data
            const name = document.getElementById('name').value;
            const company = document.getElementById('company').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
            const inquiry = document.getElementById('interest') ? document.getElementById('interest').value : '';
            const message = document.getElementById('message').value;
            
            // Construct payload to match empasy.io API requirements
            const payload = {
                name: name,
                email: email,
                subject: '[Empasy Homepage Contact] ' + (company || name),
                content: `Company: ${company}\nPhone: ${phone}\n\nInquiry: ${inquiry}\n\nMessage:\n${message}`
            };
            
            try {
                const response = await fetch(
                    'https://7f4wwc40if.execute-api.ap-northeast-2.amazonaws.com/dev/email-contact-us-template-dev-sendEmail',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    }
                );
                
                if (response.ok) {
                    alert('Successfully submitted. We will contact you soon.');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send email');
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('Failed to submit. Please try again later.');
            } finally {
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }
});
