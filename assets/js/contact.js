document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Detect current language from html lang attribute or URL
        const htmlLang = document.documentElement.lang || 'ko';
        const isEn = htmlLang.startsWith('en') || window.location.pathname.includes('/en/');
        const isJa = htmlLang.startsWith('ja') || window.location.pathname.includes('/ja/');

        const i18nMsg = {
            loading: isEn ? 'Submitting inquiry...' : (isJa ? '送信処理中...' : '문의를 접수하는 중입니다...'),
            consentRequired: isEn 
                ? 'Please agree to the Privacy Policy to submit your inquiry.' 
                : (isJa ? 'プライバシーポリシーへの同意が必要です。' : '개인정보 수집 및 이용에 동의해주세요.'),
            success: isEn 
                ? 'Thank you! Your inquiry has been submitted successfully. Our enterprise solutions specialist will contact you within 24 hours.' 
                : (isJa ? 'お問い合わせが正常に受け付けられました。担当者より24時間以内に折り返しご連絡いたします。' : '문의가 정상적으로 접수되었습니다. 담당 솔루션 전문가가 확인 후 24시간 이내에 신속히 회신드리겠습니다.'),
            error: isEn 
                ? 'Failed to submit inquiry. Please try again or email us directly at poh@empasy.com.' 
                : (isJa ? '送信に失敗しました。しばらく経ってから再度お試しいただくか、poh@empasy.comまでご連絡ください。' : '문의 접수 중 통신 오류가 발생했습니다. 잠시 후 다시 시도해주시거나 poh@empasy.com으로 직접 문의해 주세요.')
        };

        // Create or get status alert banner
        let alertBanner = document.getElementById('contactAlertBanner');
        if (!alertBanner) {
            alertBanner = document.createElement('div');
            alertBanner.id = 'contactAlertBanner';
            alertBanner.className = 'contact-alert-banner';
            contactForm.insertBefore(alertBanner, contactForm.firstChild);
        }

        function showAlert(type, message) {
            alertBanner.className = 'contact-alert-banner';
            alertBanner.style.display = 'block';
            
            if (type === 'loading') {
                alertBanner.classList.add('alert-loading');
                alertBanner.innerHTML = `<span class="contact-spinner"></span> <span>${message}</span>`;
            } else if (type === 'success') {
                alertBanner.classList.add('alert-success');
                alertBanner.innerHTML = `<i class="fas fa-check-circle" style="margin-right: 8px;"></i> <span>${message}</span>`;
            } else if (type === 'error') {
                alertBanner.classList.add('alert-error');
                alertBanner.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i> <span>${message}</span>`;
            }
            alertBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate privacy consent
            const consentCheckbox = document.getElementById('privacyConsent');
            if (consentCheckbox && !consentCheckbox.checked) {
                showAlert('error', i18nMsg.consentRequired);
                consentCheckbox.focus();
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            // UI Feedback: Loading state
            submitBtn.disabled = true;
            showAlert('loading', i18nMsg.loading);
            
            // Gather form data
            const name = document.getElementById('name').value.trim();
            const company = document.getElementById('company').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
            const inquiry = document.getElementById('interest') ? document.getElementById('interest').value : '';
            const ndaChecked = document.getElementById('ndaRequired')?.checked;
            const onPremChecked = document.getElementById('onPremisesPoc')?.checked;
            let optionsText = '';
            if (ndaChecked) optionsText += '\n- [요청] 사전 NDA(비밀유지계약) 체결 희망';
            if (onPremChecked) optionsText += '\n- [요청] 온프레미스(망분리) 폐쇄망 PoC 지원 희망';
            
            // Construct payload to match empasy.io API requirements
            const payload = {
                name: name,
                email: email,
                subject: '[Empasy Homepage Contact] ' + (company ? company + ' - ' + name : name),
                content: 'Company: ' + company + '\nPhone: ' + phone + '\n\nInquiry: ' + inquiry + (optionsText ? '\n\nOptions:' + optionsText : '') + '\n\nMessage:\n' + message
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
                    showAlert('success', i18nMsg.success);
                    contactForm.reset();
                } else {
                    throw new Error('Server responded with status: ' + response.status);
                }
            } catch (error) {
                console.error('Contact submission error:', error);
                showAlert('error', i18nMsg.error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }
});
