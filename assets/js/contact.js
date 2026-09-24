document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Detect current language from html lang attribute or URL
        const htmlLang = document.documentElement.lang || 'ko';
        const isEn = htmlLang.startsWith('en') || window.location.pathname.includes('/en/');
        const isJa = htmlLang.startsWith('ja') || window.location.pathname.includes('/ja/');

        const i18n = {
            loading: isEn ? 'Submitting inquiry...' : (isJa ? '送信処理中...' : '문의를 접수하는 중입니다...'),
            consentRequired: isEn 
                ? 'Please agree to the Privacy Policy to submit your inquiry.' 
                : (isJa ? 'プライバシーポリシーへの同意が必要です。' : '개인정보 수집 및 이용에 동의해주세요.'),
            error: isEn 
                ? 'Failed to submit inquiry. Please try again or email us directly at poh@empasy.com.' 
                : (isJa ? '送信に失敗しました。しばらく経ってから再度お試しいただくか、poh@empasy.comまでご連絡ください。' : '문의 접수 중 통신 오류가 발생했습니다. 잠시 후 다시 시도해주시거나 poh@empasy.com으로 직접 문의해 주세요.'),
            successTitle: isEn
                ? 'Inquiry Submitted Successfully'
                : (isJa ? 'お問い合わせを受け付けました' : '문의가 정상적으로 접수되었습니다'),
            successDesc: (email) => isEn
                ? `A confirmation has been recorded for <strong>${email}</strong>.<br>Our enterprise solutions architect will review your technical requirements and respond within <strong>24 hours</strong>.`
                : (isJa
                    ? `ご入力いただいたメールアドレス(<strong>${email}</strong>)宛てに受付情報が記録されました。<br>専任ソリューションアーキテクトが内容を確認の上、<strong>24時間以内</strong>に迅速にご連絡いたします。`
                    : `입력하신 이메일(<strong>${email}</strong>)로 접수 확인 정보가 전달되었습니다.<br>전담 솔루션 아키텍트가 고객사 환경을 사전 검토한 후 <strong>24시간 이내</strong>에 신속히 회신드리겠습니다.`),
            summaryHeader: isEn ? 'Inquiry Receipt' : (isJa ? '受付控え' : '접수 확인증'),
            badgeStatus: isEn ? 'Received (SLA 24h)' : (isJa ? '受付完了 (SLA 24h)' : '접수 완료 (SLA 24h)'),
            labels: {
                time: isEn ? 'Submission Time' : (isJa ? '受付日時' : '접수 일시'),
                applicant: isEn ? 'Applicant' : (isJa ? 'お名前' : '문의자'),
                company: isEn ? 'Company' : (isJa ? '会社名' : '회사명'),
                email: isEn ? 'Email' : (isJa ? 'メールアドレス' : '이메일'),
                phone: isEn ? 'Phone' : (isJa ? '電話番号' : '연락처'),
                interest: isEn ? 'Solution' : (isJa ? '関心ソリューション' : '관심 솔루션'),
                options: isEn ? 'Options' : (isJa ? '選択オプション' : '요청 옵션')
            },
            homeUrl: isEn ? '/en/' : (isJa ? '/ja/' : '/ko/'),
            btnHome: isEn ? 'Back to Home' : (isJa ? 'ホームへ戻る' : '메인으로 이동'),
            btnNewInquiry: isEn ? 'Submit Another Inquiry' : (isJa ? '新しいお問い合わせを作成' : '추가 문의 접수하기')
        };

        // Create or get status alert banner (for validation & error messages)
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
            } else if (type === 'error') {
                alertBanner.classList.add('alert-error');
                alertBanner.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i> <span>${message}</span>`;
            }
            alertBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        function hideAlert() {
            if (alertBanner) {
                alertBanner.style.display = 'none';
            }
        }

        function formatDateTime(d) {
            const pad = (n) => String(n).padStart(2, '0');
            const yyyy = d.getFullYear();
            const mm = pad(d.getMonth() + 1);
            const dd = pad(d.getDate());
            const hh = pad(d.getHours());
            const mi = pad(d.getMinutes());
            return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
        }

        function showSuccessView(data) {
            const container = contactForm.closest('.contact-form') || contactForm.parentElement;
            contactForm.style.display = 'none';

            // Remove existing success view if present
            const oldSuccess = container.querySelector('.contact-success-view');
            if (oldSuccess) {
                oldSuccess.remove();
            }

            const successView = document.createElement('div');
            successView.className = 'contact-success-view';

            const formattedTime = formatDateTime(data.timestamp || new Date());
            const optionsList = [];
            if (data.ndaChecked) {
                optionsList.push(isEn ? 'Mutual NDA Agreement' : (isJa ? '相互秘密保持契約(NDA)締結' : '상호 비밀유지계약(NDA) 체결'));
            }
            if (data.onPremChecked) {
                optionsList.push(isEn ? 'Air-Gapped On-Premises PoC' : (isJa ? 'オンプレミス(閉域環境)PoC支援' : '온프레미스(망분리) 폐쇄망 PoC 지원'));
            }

            const optionsHtml = optionsList.length > 0
                ? `<div class="contact-summary-row">
                    <span class="contact-summary-label">${i18n.labels.options}</span>
                    <span class="contact-summary-value">${optionsList.join('<br>')}</span>
                   </div>`
                : '';

            successView.innerHTML = `
                <div class="contact-success-icon-wrap">
                    <svg class="contact-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h3 class="contact-success-title">${i18n.successTitle}</h3>
                <p class="contact-success-desc">${i18n.successDesc(data.email)}</p>

                <div class="contact-summary-box">
                    <div class="contact-summary-header">
                        <span>${i18n.summaryHeader}</span>
                        <span class="contact-summary-badge">
                            <i class="fas fa-check" style="font-size: 0.7rem;"></i> ${i18n.badgeStatus}
                        </span>
                    </div>
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i18n.labels.time}</span>
                        <span class="contact-summary-value">${formattedTime}</span>
                    </div>
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i18n.labels.applicant}</span>
                        <span class="contact-summary-value">${escapeHtml(data.name)}</span>
                    </div>
                    ${data.company ? `
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i18n.labels.company}</span>
                        <span class="contact-summary-value">${escapeHtml(data.company)}</span>
                    </div>` : ''}
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i18n.labels.email}</span>
                        <span class="contact-summary-value">${escapeHtml(data.email)}</span>
                    </div>
                    ${data.phone ? `
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i18n.labels.phone}</span>
                        <span class="contact-summary-value">${escapeHtml(data.phone)}</span>
                    </div>` : ''}
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i18n.labels.interest}</span>
                        <span class="contact-summary-value">${escapeHtml(data.inquiry)}</span>
                    </div>
                    ${optionsHtml}
                </div>

                <div class="contact-success-actions">
                    <a href="${i18n.homeUrl}" class="btn btn-outline">${i18n.btnHome}</a>
                    <button type="button" id="btnResetInquiry" class="btn btn-primary">${i18n.btnNewInquiry}</button>
                </div>
            `;

            container.appendChild(successView);

            // Scroll container smoothly into view
            container.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Event listener for resetting form and writing a new inquiry
            const btnReset = successView.querySelector('#btnResetInquiry');
            if (btnReset) {
                btnReset.addEventListener('click', () => {
                    successView.remove();
                    contactForm.reset();
                    hideAlert();
                    contactForm.style.display = 'block';
                    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    const firstInput = document.getElementById('name');
                    if (firstInput) firstInput.focus();
                });
            }
        }

        function escapeHtml(str) {
            if (!str) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideAlert();

            // Validate privacy consent
            const consentCheckbox = document.getElementById('privacyConsent');
            if (consentCheckbox && !consentCheckbox.checked) {
                showAlert('error', i18n.consentRequired);
                consentCheckbox.focus();
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            
            // UI Feedback: Button Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="contact-spinner" style="width: 16px; height: 16px; border-width: 2px; vertical-align: middle; margin-right: 8px;"></span> <span>${i18n.loading}</span>`;
            showAlert('loading', i18n.loading);
            
            // Gather form data
            const name = document.getElementById('name') ? document.getElementById('name').value.trim() : '';
            const company = document.getElementById('company') ? document.getElementById('company').value.trim() : '';
            const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
            const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
            const inquiry = document.getElementById('interest') ? document.getElementById('interest').value : '';
            const message = document.getElementById('message') ? document.getElementById('message').value.trim() : '';
            const ndaChecked = document.getElementById('ndaRequired')?.checked;
            const onPremChecked = document.getElementById('onPremisesPoc')?.checked;

            let optionsText = '';
            if (ndaChecked) {
                optionsText += isEn
                    ? '\n- [Request] Mutual Non-Disclosure Agreement (NDA) required'
                    : (isJa ? '\n- [要望] 相互秘密保持契約(NDA)の締結希望' : '\n- [요청] 사전 NDA(비밀유지계약) 체결 희망');
            }
            if (onPremChecked) {
                optionsText += isEn
                    ? '\n- [Request] On-Premises (Air-Gapped) PoC support required'
                    : (isJa ? '\n- [要望] オンプレミス(閉域網)PoC支援希望' : '\n- [요청] 온프레미스(망분리) 폐쇄망 PoC 지원 희망');
            }
            
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
                    showSuccessView({
                        name,
                        company,
                        email,
                        phone,
                        inquiry,
                        ndaChecked,
                        onPremChecked,
                        timestamp: new Date()
                    });
                } else {
                    throw new Error('Server responded with status: ' + response.status);
                }
            } catch (error) {
                console.error('Contact submission error:', error);
                showAlert('error', i18n.error);
                // Keep the form and user inputs safe so user does not lose typed data
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        });
    }
});
