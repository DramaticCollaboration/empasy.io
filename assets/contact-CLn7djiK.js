document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`contactForm`);if(e){let t=document.documentElement.lang||`ko`,n=t.startsWith(`en`)||window.location.pathname.includes(`/en/`),r=t.startsWith(`ja`)||window.location.pathname.includes(`/ja/`),i={loading:n?`Submitting inquiry...`:r?`送信処理中...`:`문의를 접수하는 중입니다...`,consentRequired:n?`Please agree to the Privacy Policy to submit your inquiry.`:r?`プライバシーポリシーへの同意が必要です。`:`개인정보 수집 및 이용에 동의해주세요.`,error:n?`Failed to submit inquiry. Please try again or email us directly at poh@empasy.com.`:r?`送信に失敗しました。しばらく経ってから再度お試しいただくか、poh@empasy.comまでご連絡ください。`:`문의 접수 중 통신 오류가 발생했습니다. 잠시 후 다시 시도해주시거나 poh@empasy.com으로 직접 문의해 주세요.`,successTitle:n?`Inquiry Submitted Successfully`:r?`お問い合わせを受け付けました`:`문의가 정상적으로 접수되었습니다`,successDesc:e=>n?`A confirmation has been recorded for <strong>${e}</strong>.<br>Our specialist team will review your needs and respond within <strong>1 business day (24h)</strong>.`:r?`ご入力いただいたメールアドレス(<strong>${e}</strong>)宛てに受付情報が記録されました。<br>専任担当者が内容を確認の上、<strong>営業日24時間以内</strong>にご連絡いたします。`:`입력하신 이메일(<strong>${e}</strong>)로 접수 확인 정보가 전달되었습니다.<br>전담 실무 담당자가 업무 환경을 검토한 뒤 <strong>영업일 24시간 이내</strong>에 회신드리겠습니다.`,summaryHeader:n?`Inquiry Receipt`:r?`受付控え`:`접수 확인증`,badgeStatus:n?`Received (24h)`:r?`受付完了 (24h)`:`접수 완료 (24h)`,labels:{time:n?`Submission Time`:r?`受付日時`:`접수 일시`,applicant:n?`Applicant`:r?`お名前`:`문의자`,company:n?`Company`:r?`会社名`:`회사명`,email:n?`Email`:r?`メールアドレス`:`이메일`,phone:n?`Phone`:r?`電話番号`:`연락처`,interest:n?`Focus Area`:r?`相談内容・領域`:`관심 업무 영역`,options:n?`Options`:r?`選択オプション`:`요청 옵션`},defaultTopic:n?`General Consultation (Recommend Best Starting Area)`:r?`全体相談（最適な構成を提案希望）`:`전체 상담 (맞춤 모듈 추천 희망)`,prefillPrefix:n?`Recommended combination selected from the 30-second finder:`:r?`30秒診断で選択されたおすすめ構成:`:`30초 맞춤 찾기에서 선택된 추천 조합:`,homeUrl:n?`/en/pages/index.html`:r?`/ja/pages/index.html`:`/`,btnHome:n?`Back to Home`:r?`ホームへ戻る`:`메인으로 이동`,btnNewInquiry:n?`Submit Another Inquiry`:r?`新しいお問い合わせを作成`:`추가 문의 접수하기`},a=Array.from(e.querySelectorAll(`input[name="inquiryTopic"]`));function o(){a.forEach(e=>{let t=e.closest(`.ed-topic-item`);t&&t.classList.toggle(`is-checked`,e.checked)})}a.forEach(e=>{e.addEventListener(`change`,o)});let s=new URLSearchParams(window.location.search),c=s.get(`topics`),l=s.get(`rec`),u=s.get(`onprem`);if(c&&a.length>0){let e=c.split(`,`).map(e=>e.trim()).filter(Boolean);a.forEach(t=>{e.indexOf(t.dataset.topicKey||``)!==-1&&(t.checked=!0)})}if(u===`1`){let e=document.getElementById(`onPremisesPoc`);e&&(e.checked=!0)}if(l){let e=document.getElementById(`edPrefillBanner`);e&&(e.textContent=i.prefillPrefix+` `+l,e.classList.add(`is-visible`));let t=document.getElementById(`specificProduct`);t&&!t.value&&(t.value=l)}o(),e.addEventListener(`reset`,()=>{setTimeout(o,0)});let d=document.getElementById(`interest`);if(d&&!d.dataset.customized){d.dataset.customized=`true`;let t=document.createElement(`div`);t.className=`custom-select-wrapper`,d.parentNode.insertBefore(t,d),t.appendChild(d),d.style.position=`absolute`,d.style.opacity=`0`,d.style.pointerEvents=`none`,d.style.width=`0`,d.style.height=`0`,d.setAttribute(`tabindex`,`-1`),d.setAttribute(`aria-hidden`,`true`);let n=document.createElement(`button`);n.type=`button`,n.className=`custom-select-trigger`,n.setAttribute(`role`,`combobox`),n.setAttribute(`aria-expanded`,`false`),n.setAttribute(`aria-haspopup`,`listbox`),n.setAttribute(`aria-controls`,`interest-listbox`);let r=document.createElement(`span`);r.className=`custom-select-trigger-text`,r.textContent=d.options[d.selectedIndex]?.text||``;let i=document.createElement(`span`);i.innerHTML=`<svg class="custom-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,n.appendChild(r),n.appendChild(i.firstElementChild);let a=document.createElement(`div`);a.id=`interest-listbox`,a.className=`custom-select-menu`,a.setAttribute(`role`,`listbox`);let o=d.selectedIndex>=0?d.selectedIndex:0,s=[];Array.from(d.options).forEach((e,t)=>{let r=document.createElement(`div`);r.className=`custom-select-option`+(t===d.selectedIndex?` is-selected`:``),r.setAttribute(`role`,`option`),r.setAttribute(`aria-selected`,t===d.selectedIndex?`true`:`false`),r.dataset.index=String(t);let i=document.createElement(`span`);i.textContent=e.text;let o=document.createElement(`span`);o.innerHTML=`<svg class="custom-select-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,r.appendChild(i),r.appendChild(o.firstElementChild),r.addEventListener(`click`,()=>{c(t),f(),n.focus()}),s.push(r),a.appendChild(r)}),t.appendChild(n),t.appendChild(a);function c(e){e<0||e>=s.length||(d.selectedIndex=e,o=e,r.textContent=d.options[e].text,s.forEach((t,n)=>{let r=n===e;t.classList.toggle(`is-selected`,r),t.classList.remove(`is-focused`),t.setAttribute(`aria-selected`,r?`true`:`false`)}),d.dispatchEvent(new Event(`change`,{bubbles:!0})))}function l(e){e<0&&(e=s.length-1),e>=s.length&&(e=0),o=e,s.forEach((e,t)=>{e.classList.toggle(`is-focused`,t===o)});let t=s[o];t&&typeof t.scrollIntoView==`function`&&t.scrollIntoView({block:`nearest`})}function u(){t.classList.add(`is-open`),n.setAttribute(`aria-expanded`,`true`),l(d.selectedIndex>=0?d.selectedIndex:0)}function f(){t.classList.remove(`is-open`),n.setAttribute(`aria-expanded`,`false`),s.forEach(e=>e.classList.remove(`is-focused`))}n.addEventListener(`click`,()=>{t.classList.contains(`is-open`)?f():u()}),n.addEventListener(`keydown`,e=>{let n=t.classList.contains(`is-open`);e.key===`ArrowDown`?(e.preventDefault(),n?l(o+1):u()):e.key===`ArrowUp`?(e.preventDefault(),n?l(o-1):u()):e.key===`Enter`||e.key===` `?(e.preventDefault(),n?(c(o),f()):u()):e.key===`Escape`?n&&(e.preventDefault(),f()):e.key===`Tab`&&f()}),document.addEventListener(`click`,e=>{t.contains(e.target)||f()}),e.addEventListener(`reset`,()=>{setTimeout(()=>{c(d.selectedIndex>=0?d.selectedIndex:0)},0)})}let f=document.getElementById(`contactAlertBanner`);f||(f=document.createElement(`div`),f.id=`contactAlertBanner`,f.className=`contact-alert-banner`,e.insertBefore(f,e.firstChild));function p(e,t){f.className=`contact-alert-banner`,f.style.display=`block`,e===`loading`?(f.classList.add(`alert-loading`),f.innerHTML=`<span class="contact-spinner"></span> <span>${t}</span>`):e===`error`&&(f.classList.add(`alert-error`),f.innerHTML=`<i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i> <span>${t}</span>`),f.scrollIntoView({behavior:`smooth`,block:`center`})}function m(){f&&(f.style.display=`none`)}function h(e){let t=e=>String(e).padStart(2,`0`);return`${e.getFullYear()}.${t(e.getMonth()+1)}.${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}`}function g(t){let a=e.closest(`.contact-form`)||e.parentElement;e.style.display=`none`;let o=a.querySelector(`.contact-success-view`);o&&o.remove();let s=document.createElement(`div`);s.className=`contact-success-view`;let c=h(t.timestamp||new Date),l=[];t.ndaChecked&&l.push(n?`Mutual NDA Agreement`:r?`相互秘密保持契約(NDA)締結`:`상호 비밀유지계약(NDA) 체결`),t.onPremChecked&&l.push(n?`Air-Gapped On-Premises PoC`:r?`オンプレミス(閉域環境)PoC支援`:`온프레미스(망분리) 폐쇄망 PoC 지원`);let u=l.length>0?`<div class="contact-summary-row">
                    <span class="contact-summary-label">${i.labels.options}</span>
                    <span class="contact-summary-value">${l.join(`<br>`)}</span>
                   </div>`:``;s.innerHTML=`
                <div class="contact-success-icon-wrap">
                    <svg class="contact-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h3 class="contact-success-title">${i.successTitle}</h3>
                <p class="contact-success-desc">${i.successDesc(_(t.email))}</p>

                <div class="contact-summary-box">
                    <div class="contact-summary-header">
                        <span>${i.summaryHeader}</span>
                        <span class="contact-summary-badge">
                            <i class="fas fa-check" style="font-size: 0.7rem;"></i> ${i.badgeStatus}
                        </span>
                    </div>
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.time}</span>
                        <span class="contact-summary-value">${c}</span>
                    </div>
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.applicant}</span>
                        <span class="contact-summary-value">${_(t.name)}</span>
                    </div>
                    ${t.company?`
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.company}</span>
                        <span class="contact-summary-value">${_(t.company)}</span>
                    </div>`:``}
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.email}</span>
                        <span class="contact-summary-value">${_(t.email)}</span>
                    </div>
                    ${t.phone?`
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.phone}</span>
                        <span class="contact-summary-value">${_(t.phone)}</span>
                    </div>`:``}
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.interest}</span>
                        <span class="contact-summary-value">${_(t.inquiry)}</span>
                    </div>
                    ${u}
                </div>

                <div class="contact-success-actions">
                    <a href="${i.homeUrl}" class="btn btn-outline">${i.btnHome}</a>
                    <button type="button" id="btnResetInquiry" class="btn btn-primary">${i.btnNewInquiry}</button>
                </div>
            `,a.appendChild(s),a.scrollIntoView({behavior:`smooth`,block:`center`});let d=s.querySelector(`#btnResetInquiry`);d&&d.addEventListener(`click`,()=>{s.remove(),e.reset(),m(),e.style.display=`block`,a.scrollIntoView({behavior:`smooth`,block:`start`});let t=document.getElementById(`name`);t&&t.focus()})}function _(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}e.addEventListener(`submit`,async t=>{t.preventDefault(),m();let o=document.getElementById(`privacyConsent`);if(o&&!o.checked){p(`error`,i.consentRequired),o.focus();return}let s=e.querySelector(`button[type="submit"]`),c=s.innerHTML;s.disabled=!0,s.innerHTML=`<span class="contact-spinner" style="width: 16px; height: 16px; border-width: 2px; vertical-align: middle; margin-right: 8px;"></span> <span>${i.loading}</span>`,p(`loading`,i.loading);let l=document.getElementById(`name`)?document.getElementById(`name`).value.trim():``,u=document.getElementById(`company`)?document.getElementById(`company`).value.trim():``,d=document.getElementById(`email`)?document.getElementById(`email`).value.trim():``,f=document.getElementById(`phone`)?document.getElementById(`phone`).value.trim():``,h=a.filter(e=>e.checked).map(e=>e.value),_=document.getElementById(`specificProduct`)?document.getElementById(`specificProduct`).value.trim():``,v=document.getElementById(`interest`)?document.getElementById(`interest`).value:``,y=h.length>0?h.join(`, `):v||i.defaultTopic;_&&(y+=` [`+_+`]`);let b=document.getElementById(`message`)?document.getElementById(`message`).value.trim():``,x=document.getElementById(`ndaRequired`)?.checked,S=document.getElementById(`onPremisesPoc`)?.checked,C=``;x&&(C+=n?`
- [Request] Mutual Non-Disclosure Agreement (NDA) required`:r?`
- [要望] 相互秘密保持契約(NDA)の締結希望`:`
- [요청] 사전 NDA(비밀유지계약) 체결 희망`),S&&(C+=n?`
- [Request] On-Premises (Air-Gapped) PoC support required`:r?`
- [要望] オンプレミス(閉域網)PoC支援希望`:`
- [요청] 온프레미스(망분리) 폐쇄망 PoC 지원 희망`);let w={name:l,email:d,subject:`[Empasy Homepage Contact] `+(u?u+` - `+l:l),content:`Company: `+u+`
Phone: `+f+`

Inquiry: `+y+(C?`

Options:`+C:``)+`

Message:
`+b};try{let e=await fetch(`https://7f4wwc40if.execute-api.ap-northeast-2.amazonaws.com/dev/email-contact-us-template-dev-sendEmail`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(w)});if(e.ok)g({name:l,company:u,email:d,phone:f,inquiry:y,ndaChecked:x,onPremChecked:S,timestamp:new Date});else throw Error(`Server responded with status: `+e.status)}catch(e){console.error(`Contact submission error:`,e),p(`error`,i.error),s.disabled=!1,s.innerHTML=c}})}});