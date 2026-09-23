import{n as e}from"./main-BnIpxlDE.js";var t=e((()=>{document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`contactForm`);if(e){let t=document.documentElement.lang||`ko`,n=t.startsWith(`en`)||window.location.pathname.includes(`/en/`),r=t.startsWith(`ja`)||window.location.pathname.includes(`/ja/`),i={loading:n?`Submitting inquiry...`:r?`送信処理中...`:`문의를 접수하는 중입니다...`,consentRequired:n?`Please agree to the Privacy Policy to submit your inquiry.`:r?`プライバシーポリシーへの同意が必要です。`:`개인정보 수집 및 이용에 동의해주세요.`,error:n?`Failed to submit inquiry. Please try again or email us directly at poh@empasy.com.`:r?`送信に失敗しました。しばらく経ってから再度お試しいただくか、poh@empasy.comまでご連絡ください。`:`문의 접수 중 통신 오류가 발생했습니다. 잠시 후 다시 시도해주시거나 poh@empasy.com으로 직접 문의해 주세요.`,successTitle:n?`Inquiry Submitted Successfully`:r?`お問い合わせを受け付けました`:`문의가 정상적으로 접수되었습니다`,successDesc:e=>n?`A confirmation has been recorded for <strong>${e}</strong>.<br>Our enterprise solutions architect will review your technical requirements and respond within <strong>24 hours</strong>.`:r?`ご入力いただいたメールアドレス(<strong>${e}</strong>)宛てに受付情報が記録されました。<br>専任ソリューションアーキテクトが内容を確認の上、<strong>24時間以内</strong>に迅速にご連絡いたします。`:`입력하신 이메일(<strong>${e}</strong>)로 접수 확인 정보가 전달되었습니다.<br>전담 솔루션 아키텍트가 고객사 환경을 사전 검토한 후 <strong>24시간 이내</strong>에 신속히 회신드리겠습니다.`,summaryHeader:n?`Inquiry Receipt`:r?`受付控え`:`접수 확인증`,badgeStatus:n?`Received (SLA 24h)`:r?`受付完了 (SLA 24h)`:`접수 완료 (SLA 24h)`,labels:{time:n?`Submission Time`:r?`受付日時`:`접수 일시`,applicant:n?`Applicant`:r?`お名前`:`문의자`,company:n?`Company`:r?`会社名`:`회사명`,email:n?`Email`:r?`メールアドレス`:`이메일`,phone:n?`Phone`:r?`電話番号`:`연락처`,interest:n?`Solution`:r?`関心ソリューション`:`관심 솔루션`,options:n?`Options`:r?`選択オプション`:`요청 옵션`},homeUrl:n?`/en/`:r?`/ja/`:`/ko/`,btnHome:n?`Back to Home`:r?`ホームへ戻る`:`메인으로 이동`,btnNewInquiry:n?`Submit Another Inquiry`:r?`新しいお問い合わせを作成`:`추가 문의 접수하기`},a=document.getElementById(`contactAlertBanner`);a||(a=document.createElement(`div`),a.id=`contactAlertBanner`,a.className=`contact-alert-banner`,e.insertBefore(a,e.firstChild));function o(e,t){a.className=`contact-alert-banner`,a.style.display=`block`,e===`loading`?(a.classList.add(`alert-loading`),a.innerHTML=`<span class="contact-spinner"></span> <span>${t}</span>`):e===`error`&&(a.classList.add(`alert-error`),a.innerHTML=`<i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i> <span>${t}</span>`),a.scrollIntoView({behavior:`smooth`,block:`center`})}function s(){a&&(a.style.display=`none`)}function c(e){let t=e=>String(e).padStart(2,`0`);return`${e.getFullYear()}.${t(e.getMonth()+1)}.${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}`}function l(t){let a=e.closest(`.contact-form`)||e.parentElement;e.style.display=`none`;let o=a.querySelector(`.contact-success-view`);o&&o.remove();let l=document.createElement(`div`);l.className=`contact-success-view`;let d=c(t.timestamp||new Date),f=[];t.ndaChecked&&f.push(n?`Mutual NDA Agreement`:r?`相互秘密保持契約(NDA)締結`:`상호 비밀유지계약(NDA) 체결`),t.onPremChecked&&f.push(n?`Air-Gapped On-Premises PoC`:r?`オンプレミス(閉域環境)PoC支援`:`온프레미스(망분리) 폐쇄망 PoC 지원`);let p=f.length>0?`<div class="contact-summary-row">
                    <span class="contact-summary-label">${i.labels.options}</span>
                    <span class="contact-summary-value">${f.join(`<br>`)}</span>
                   </div>`:``;l.innerHTML=`
                <div class="contact-success-icon-wrap">
                    <svg class="contact-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h3 class="contact-success-title">${i.successTitle}</h3>
                <p class="contact-success-desc">${i.successDesc(t.email)}</p>

                <div class="contact-summary-box">
                    <div class="contact-summary-header">
                        <span>${i.summaryHeader}</span>
                        <span class="contact-summary-badge">
                            <i class="fas fa-check" style="font-size: 0.7rem;"></i> ${i.badgeStatus}
                        </span>
                    </div>
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.time}</span>
                        <span class="contact-summary-value">${d}</span>
                    </div>
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.applicant}</span>
                        <span class="contact-summary-value">${u(t.name)}</span>
                    </div>
                    ${t.company?`
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.company}</span>
                        <span class="contact-summary-value">${u(t.company)}</span>
                    </div>`:``}
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.email}</span>
                        <span class="contact-summary-value">${u(t.email)}</span>
                    </div>
                    ${t.phone?`
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.phone}</span>
                        <span class="contact-summary-value">${u(t.phone)}</span>
                    </div>`:``}
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.interest}</span>
                        <span class="contact-summary-value">${u(t.inquiry)}</span>
                    </div>
                    ${p}
                </div>

                <div class="contact-success-actions">
                    <a href="${i.homeUrl}" class="btn btn-outline">${i.btnHome}</a>
                    <button type="button" id="btnResetInquiry" class="btn btn-primary">${i.btnNewInquiry}</button>
                </div>
            `,a.appendChild(l),a.scrollIntoView({behavior:`smooth`,block:`center`});let m=l.querySelector(`#btnResetInquiry`);m&&m.addEventListener(`click`,()=>{l.remove(),e.reset(),s(),e.style.display=`block`,a.scrollIntoView({behavior:`smooth`,block:`start`});let t=document.getElementById(`name`);t&&t.focus()})}function u(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}e.addEventListener(`submit`,async t=>{t.preventDefault(),s();let n=document.getElementById(`privacyConsent`);if(n&&!n.checked){o(`error`,i.consentRequired),n.focus();return}let r=e.querySelector(`button[type="submit"]`),a=r.innerHTML;r.disabled=!0,r.innerHTML=`<span class="contact-spinner" style="width: 16px; height: 16px; border-width: 2px; vertical-align: middle; margin-right: 8px;"></span> <span>${i.loading}</span>`,o(`loading`,i.loading);let c=document.getElementById(`name`)?document.getElementById(`name`).value.trim():``,u=document.getElementById(`company`)?document.getElementById(`company`).value.trim():``,d=document.getElementById(`email`)?document.getElementById(`email`).value.trim():``,f=document.getElementById(`phone`)?document.getElementById(`phone`).value.trim():``,p=document.getElementById(`interest`)?document.getElementById(`interest`).value:``,m=document.getElementById(`message`)?document.getElementById(`message`).value.trim():``,h=document.getElementById(`ndaRequired`)?.checked,g=document.getElementById(`onPremisesPoc`)?.checked,_=``;h&&(_+=`
- [요청] 사전 NDA(비밀유지계약) 체결 희망`),g&&(_+=`
- [요청] 온프레미스(망분리) 폐쇄망 PoC 지원 희망`);let v={name:c,email:d,subject:`[Empasy Homepage Contact] `+(u?u+` - `+c:c),content:`Company: `+u+`
Phone: `+f+`

Inquiry: `+p+(_?`

Options:`+_:``)+`

Message:
`+m};try{let e=await fetch(`https://7f4wwc40if.execute-api.ap-northeast-2.amazonaws.com/dev/email-contact-us-template-dev-sendEmail`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(v)});if(e.ok)l({name:c,company:u,email:d,phone:f,inquiry:p,ndaChecked:h,onPremChecked:g,timestamp:new Date});else throw Error(`Server responded with status: `+e.status)}catch(e){console.error(`Contact submission error:`,e),o(`error`,i.error),r.disabled=!1,r.innerHTML=a}})}})}));export{t};