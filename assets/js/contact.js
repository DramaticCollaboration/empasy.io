document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Detect current language from html lang attribute or URL
        const htmlLang = document.documentElement.lang || 'ko';
        const isEn = htmlLang.startsWith('en') || window.location.pathname.includes('/en/');
        const isJa = htmlLang.startsWith('ja') || window.location.pathname.includes('/ja/');

        const i18nMsg = {
            loading: isEn ? 'Sending...' : (isJa ? '送信中...' : '접수 중...'),
            consentRequired: isEn 
                ? 'Please agree to the Privacy Policy to submit your inquiry.' 
                : (isJa ? 'プライバシーポリシーへの同意が必要です。' : '개인정보 수집 및 이용에 동의해주세요.'),
            success: isEn 
                ? 'Thank you! Your inquiry has been submitted successfully. We will contact you soon.' 
                : (isJa ? 'お問い合わせが正常に受け付けられました。担当者よりご連絡いたします。' : '문의가 정상적으로 접수되었습니다. 담당자가 확인 후 신속히 회신드리겠습니다.'),
            error: isEn 
                ? 'Failed to submit inquiry. Please try again later or email us at poh@empasy.com.' 
                : (isJa ? '送信に失敗しました。しばらく経ってから再度お試しいただくか、poh@empasy.comまでご連絡ください。' : '문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주시거나 poh@empasy.com으로 문의해 주세요.')
        };

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate privacy consent
            const consentCheckbox = document.getElementById('privacyConsent');
            if (consentCheckbox && !consentCheckbox.checked) {
                alert(i18nMsg.consentRequired);
                consentCheckbox.focus();
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            // UI Feedback: Loading state
            submitBtn.disabled = true;
            submitBtn.innerText = i18nMsg.loading;
            
            // Gather form data
            const name = document.getElementById('name').value.trim();
            const company = document.getElementById('company').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
            const inquiry = document.getElementById('interest') ? document.getElementById('interest').value : '';
            const message = document.getElementById('message').value.trim();
            
            // Construct payload to match empasy.io API requirements
            const payload = {
                name: name,
                email: email,
                subject: '[Empasy Homepage Contact] ' + (company ? company + ' - ' + name : name),
                content: 'Company: ' + company + '\nPhone: ' + phone + '\n\nInquiry: ' + inquiry + '\n\nMessage:\n' + message
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
                    alert(i18nMsg.success);
                    contactForm.reset();
                } else {
                    throw new Error('Server responded with status: ' + response.status);
                }
            } catch (error) {
                console.error('Contact submission error:', error);
                alert(i18nMsg.error);
            } finally {
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }
});
