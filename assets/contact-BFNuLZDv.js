document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`contactForm`);if(e){let t=document.documentElement.lang||`ko`,n=t.startsWith(`en`)||window.location.pathname.includes(`/en/`),r=t.startsWith(`ja`)||window.location.pathname.includes(`/ja/`),i={loading:n?`Submitting inquiry...`:r?`送信処理中...`:`문의를 접수하는 중입니다...`,consentRequired:n?`Please agree to the Privacy Policy to submit your inquiry.`:r?`プライバシーポリシーへの同意が必要です。`:`개인정보 수집 및 이용에 동의해주세요.`,error:n?`Failed to submit inquiry. Please try again or email us directly at poh@empasy.com.`:r?`送信に失敗しました。しばらく経ってから再度お試しいただくか、poh@empasy.comまでご連絡ください。`:`문의 접수 중 통신 오류가 발생했습니다. 잠시 후 다시 시도해주시거나 poh@empasy.com으로 직접 문의해 주세요.`,successTitle:n?`Inquiry Submitted Successfully`:r?`お問い合わせを受け付けました`:`문의가 정상적으로 접수되었습니다`,successDesc:e=>n?`A confirmation has been recorded for <strong>${e}</strong>.<br>Our enterprise solutions architect will review your technical requirements and respond within <strong>24 hours</strong>.`:r?`ご入力いただいたメールアドレス(<strong>${e}</strong>)宛てに受付情報が記録されました。<br>専任ソリューションアーキテクトが内容を確認の上、<strong>24時間以内</strong>に迅速にご連絡いたします。`:`입력하신 이메일(<strong>${e}</strong>)로 접수 확인 정보가 전달되었습니다.<br>전담 솔루션 아키텍트가 고객사 환경을 사전 검토한 후 <strong>24시간 이내</strong>에 신속히 회신드리겠습니다.`,summaryHeader:n?`Inquiry Receipt`:r?`受付控え`:`접수 확인증`,badgeStatus:n?`Received (SLA 24h)`:r?`受付完了 (SLA 24h)`:`접수 완료 (SLA 24h)`,labels:{time:n?`Submission Time`:r?`受付日時`:`접수 일시`,applicant:n?`Applicant`:r?`お名前`:`문의자`,company:n?`Company`:r?`会社名`:`회사명`,email:n?`Email`:r?`メールアドレス`:`이메일`,phone:n?`Phone`:r?`電話番号`:`연락처`,interest:n?`Solution`:r?`関心ソリューション`:`관심 솔루션`,options:n?`Options`:r?`選択オプション`:`요청 옵션`},homeUrl:n?`/en/pages/index.html`:r?`/ja/pages/index.html`:`/`,btnHome:n?`Back to Home`:r?`ホームへ戻る`:`메인으로 이동`,btnNewInquiry:n?`Submit Another Inquiry`:r?`新しいお問い合わせを作成`:`추가 문의 접수하기`},a=document.getElementById(`interest`);if(a&&!a.dataset.customized){a.dataset.customized=`true`;let t=document.createElement(`div`);t.className=`custom-select-wrapper`,a.parentNode.insertBefore(t,a),t.appendChild(a),a.style.position=`absolute`,a.style.opacity=`0`,a.style.pointerEvents=`none`,a.style.width=`0`,a.style.height=`0`,a.setAttribute(`tabindex`,`-1`),a.setAttribute(`aria-hidden`,`true`);let n=document.createElement(`button`);n.type=`button`,n.className=`custom-select-trigger`,n.setAttribute(`role`,`combobox`),n.setAttribute(`aria-expanded`,`false`),n.setAttribute(`aria-haspopup`,`listbox`),n.setAttribute(`aria-controls`,`interest-listbox`);let r=document.createElement(`span`);r.className=`custom-select-trigger-text`,r.textContent=a.options[a.selectedIndex]?.text||``;let i=document.createElement(`span`);i.innerHTML=`<svg class="custom-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,n.appendChild(r),n.appendChild(i.firstElementChild);let o=document.createElement(`div`);o.id=`interest-listbox`,o.className=`custom-select-menu`,o.setAttribute(`role`,`listbox`);let s=a.selectedIndex>=0?a.selectedIndex:0,c=[];Array.from(a.options).forEach((e,t)=>{let r=document.createElement(`div`);r.className=`custom-select-option`+(t===a.selectedIndex?` is-selected`:``),r.setAttribute(`role`,`option`),r.setAttribute(`aria-selected`,t===a.selectedIndex?`true`:`false`),r.dataset.index=String(t);let i=document.createElement(`span`);i.textContent=e.text;let s=document.createElement(`span`);s.innerHTML=`<svg class="custom-select-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,r.appendChild(i),r.appendChild(s.firstElementChild),r.addEventListener(`click`,()=>{l(t),f(),n.focus()}),c.push(r),o.appendChild(r)}),t.appendChild(n),t.appendChild(o);function l(e){e<0||e>=c.length||(a.selectedIndex=e,s=e,r.textContent=a.options[e].text,c.forEach((t,n)=>{let r=n===e;t.classList.toggle(`is-selected`,r),t.classList.remove(`is-focused`),t.setAttribute(`aria-selected`,r?`true`:`false`)}),a.dispatchEvent(new Event(`change`,{bubbles:!0})))}function u(e){e<0&&(e=c.length-1),e>=c.length&&(e=0),s=e,c.forEach((e,t)=>{e.classList.toggle(`is-focused`,t===s)});let t=c[s];t&&typeof t.scrollIntoView==`function`&&t.scrollIntoView({block:`nearest`})}function d(){t.classList.add(`is-open`),n.setAttribute(`aria-expanded`,`true`),u(a.selectedIndex>=0?a.selectedIndex:0)}function f(){t.classList.remove(`is-open`),n.setAttribute(`aria-expanded`,`false`),c.forEach(e=>e.classList.remove(`is-focused`))}n.addEventListener(`click`,()=>{t.classList.contains(`is-open`)?f():d()}),n.addEventListener(`keydown`,e=>{let n=t.classList.contains(`is-open`);e.key===`ArrowDown`?(e.preventDefault(),n?u(s+1):d()):e.key===`ArrowUp`?(e.preventDefault(),n?u(s-1):d()):e.key===`Enter`||e.key===` `?(e.preventDefault(),n?(l(s),f()):d()):e.key===`Escape`?n&&(e.preventDefault(),f()):e.key===`Tab`&&f()}),document.addEventListener(`click`,e=>{t.contains(e.target)||f()}),e.addEventListener(`reset`,()=>{setTimeout(()=>{l(a.selectedIndex>=0?a.selectedIndex:0)},0)})}let o=document.getElementById(`contactAlertBanner`);o||(o=document.createElement(`div`),o.id=`contactAlertBanner`,o.className=`contact-alert-banner`,e.insertBefore(o,e.firstChild));function s(e,t){o.className=`contact-alert-banner`,o.style.display=`block`,e===`loading`?(o.classList.add(`alert-loading`),o.innerHTML=`<span class="contact-spinner"></span> <span>${t}</span>`):e===`error`&&(o.classList.add(`alert-error`),o.innerHTML=`<i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i> <span>${t}</span>`),o.scrollIntoView({behavior:`smooth`,block:`center`})}function c(){o&&(o.style.display=`none`)}function l(e){let t=e=>String(e).padStart(2,`0`);return`${e.getFullYear()}.${t(e.getMonth()+1)}.${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}`}function u(t){let a=e.closest(`.contact-form`)||e.parentElement;e.style.display=`none`;let o=a.querySelector(`.contact-success-view`);o&&o.remove();let s=document.createElement(`div`);s.className=`contact-success-view`;let u=l(t.timestamp||new Date),f=[];t.ndaChecked&&f.push(n?`Mutual NDA Agreement`:r?`相互秘密保持契約(NDA)締結`:`상호 비밀유지계약(NDA) 체결`),t.onPremChecked&&f.push(n?`Air-Gapped On-Premises PoC`:r?`オンプレミス(閉域環境)PoC支援`:`온프레미스(망분리) 폐쇄망 PoC 지원`);let p=f.length>0?`<div class="contact-summary-row">
                    <span class="contact-summary-label">${i.labels.options}</span>
                    <span class="contact-summary-value">${f.join(`<br>`)}</span>
                   </div>`:``;s.innerHTML=`
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
                        <span class="contact-summary-value">${u}</span>
                    </div>
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.applicant}</span>
                        <span class="contact-summary-value">${d(t.name)}</span>
                    </div>
                    ${t.company?`
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.company}</span>
                        <span class="contact-summary-value">${d(t.company)}</span>
                    </div>`:``}
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.email}</span>
                        <span class="contact-summary-value">${d(t.email)}</span>
                    </div>
                    ${t.phone?`
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.phone}</span>
                        <span class="contact-summary-value">${d(t.phone)}</span>
                    </div>`:``}
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.interest}</span>
                        <span class="contact-summary-value">${d(t.inquiry)}</span>
                    </div>
                    ${p}
                </div>

                <div class="contact-success-actions">
                    <a href="${i.homeUrl}" class="btn btn-outline">${i.btnHome}</a>
                    <button type="button" id="btnResetInquiry" class="btn btn-primary">${i.btnNewInquiry}</button>
                </div>
            `,a.appendChild(s),a.scrollIntoView({behavior:`smooth`,block:`center`});let m=s.querySelector(`#btnResetInquiry`);m&&m.addEventListener(`click`,()=>{s.remove(),e.reset(),c(),e.style.display=`block`,a.scrollIntoView({behavior:`smooth`,block:`start`});let t=document.getElementById(`name`);t&&t.focus()})}function d(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}e.addEventListener(`submit`,async t=>{t.preventDefault(),c();let a=document.getElementById(`privacyConsent`);if(a&&!a.checked){s(`error`,i.consentRequired),a.focus();return}let o=e.querySelector(`button[type="submit"]`),l=o.innerHTML;o.disabled=!0,o.innerHTML=`<span class="contact-spinner" style="width: 16px; height: 16px; border-width: 2px; vertical-align: middle; margin-right: 8px;"></span> <span>${i.loading}</span>`,s(`loading`,i.loading);let d=document.getElementById(`name`)?document.getElementById(`name`).value.trim():``,f=document.getElementById(`company`)?document.getElementById(`company`).value.trim():``,p=document.getElementById(`email`)?document.getElementById(`email`).value.trim():``,m=document.getElementById(`phone`)?document.getElementById(`phone`).value.trim():``,h=document.getElementById(`interest`)?document.getElementById(`interest`).value:``,g=document.getElementById(`message`)?document.getElementById(`message`).value.trim():``,_=document.getElementById(`ndaRequired`)?.checked,v=document.getElementById(`onPremisesPoc`)?.checked,y=``;_&&(y+=n?`
- [Request] Mutual Non-Disclosure Agreement (NDA) required`:r?`
- [要望] 相互秘密保持契約(NDA)の締結希望`:`
- [요청] 사전 NDA(비밀유지계약) 체결 희망`),v&&(y+=n?`
- [Request] On-Premises (Air-Gapped) PoC support required`:r?`
- [要望] オンプレミス(閉域網)PoC支援希望`:`
- [요청] 온프레미스(망분리) 폐쇄망 PoC 지원 희망`);let b={name:d,email:p,subject:`[Empasy Homepage Contact] `+(f?f+` - `+d:d),content:`Company: `+f+`
Phone: `+m+`

Inquiry: `+h+(y?`

Options:`+y:``)+`

Message:
`+g};try{let e=await fetch(`https://7f4wwc40if.execute-api.ap-northeast-2.amazonaws.com/dev/email-contact-us-template-dev-sendEmail`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(b)});if(e.ok)u({name:d,company:f,email:p,phone:m,inquiry:h,ndaChecked:_,onPremChecked:v,timestamp:new Date});else throw Error(`Server responded with status: `+e.status)}catch(e){console.error(`Contact submission error:`,e),s(`error`,i.error),o.disabled=!1,o.innerHTML=l}})}});