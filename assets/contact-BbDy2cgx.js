document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`contactForm`);if(e){let t=document.documentElement.lang||`ko`,n=t.startsWith(`en`)||window.location.pathname.includes(`/en/`),r=t.startsWith(`ja`)||window.location.pathname.includes(`/ja/`),i={loading:n?`Submitting inquiry...`:r?`送信処理中...`:`문의를 접수하는 중입니다...`,consentRequired:n?`Please agree to the Privacy Policy to submit your inquiry.`:r?`プライバシーポリシーへの同意が必要です。`:`개인정보 수집 및 이용에 동의해주세요.`,error:n?`Failed to submit inquiry. Please try again or email us directly at poh@empasy.com.`:r?`送信に失敗しました。しばらく経ってから再度お試しいただくか、poh@empasy.comまでご連絡ください。`:`문의 접수 중 통신 오류가 발생했습니다. 잠시 후 다시 시도해주시거나 poh@empasy.com으로 직접 문의해 주세요.`,successTitle:n?`Inquiry Submitted Successfully`:r?`お問い合わせを受け付けました`:`문의가 정상적으로 접수되었습니다`,successDesc:e=>n?`A confirmation has been recorded for <strong>${e}</strong>.<br>Our specialist team will review your needs and respond within <strong>1 business day (24h)</strong>.`:r?`ご入力いただいたメールアドレス(<strong>${e}</strong>)宛てに受付情報が記録されました。<br>専任担当者が内容を確認の上、<strong>営業日24時間以内</strong>にご連絡いたします。`:`입력하신 이메일(<strong>${e}</strong>)로 접수 확인 정보가 전달되었습니다.<br>전담 실무 담당자가 업무 환경을 검토한 뒤 <strong>영업일 24시간 이내</strong>에 회신드리겠습니다.`,summaryHeader:n?`Inquiry Receipt`:r?`受付控え`:`접수 확인증`,badgeStatus:n?`Received (24h)`:r?`受付完了 (24h)`:`접수 완료 (24h)`,labels:{time:n?`Submission Time`:r?`受付日時`:`접수 일시`,applicant:n?`Applicant`:r?`お名前`:`문의자`,company:n?`Company`:r?`会社名`:`회사명`,email:n?`Email`:r?`メールアドレス`:`이메일`,phone:n?`Phone`:r?`電話番号`:`연락처`,interest:n?`Focus Area`:r?`相談内容・領域`:`관심 업무 영역`,options:n?`Options`:r?`選択オプション`:`요청 옵션`},defaultTopic:n?`General Consultation (Recommend Best Starting Area)`:r?`全体相談（最適な構成を提案希望）`:`전체 상담 (맞춤 모듈 추천 희망)`,prefillPrefix:n?`Recommended combination selected from the 30-second finder:`:r?`30秒診断で選択されたおすすめ構成:`:`30초 맞춤 찾기에서 선택된 추천 조합:`,homeUrl:n?`/en/pages/index.html`:r?`/ja/pages/index.html`:`/`,btnHome:n?`Back to Home`:r?`ホームへ戻る`:`메인으로 이동`,btnNewInquiry:n?`Submit Another Inquiry`:r?`新しいお問い合わせを作成`:`추가 문의 접수하기`},a=Array.from(e.querySelectorAll(`input[name="inquiryTopic"]`));function o(){a.forEach(e=>{let t=e.closest(`.ed-topic-item`);t&&t.classList.toggle(`is-checked`,e.checked)})}a.forEach(e=>{e.addEventListener(`change`,o)});let s=new URLSearchParams(window.location.search),c=s.get(`topics`),l=s.get(`rec`),u=s.get(`onprem`);if(c&&a.length>0){let e=c.split(`,`).map(e=>e.trim()).filter(Boolean);a.forEach(t=>{e.indexOf(t.dataset.topicKey||``)!==-1&&(t.checked=!0)})}if(u===`1`){let e=document.getElementById(`onPremisesPoc`);e&&(e.checked=!0)}if(l){let e=document.getElementById(`edPrefillBanner`);e&&(e.textContent=i.prefillPrefix+` `+l,e.classList.add(`is-visible`));let t=document.getElementById(`specificProduct`);t&&!t.value&&(t.value=l)}o(),e.addEventListener(`reset`,()=>{setTimeout(o,0)});let d=document.getElementById(`contactAlertBanner`);d||(d=document.createElement(`div`),d.id=`contactAlertBanner`,d.className=`contact-alert-banner`,e.insertBefore(d,e.firstChild));function f(e,t){d.className=`contact-alert-banner`,d.style.display=`block`,e===`loading`?(d.classList.add(`alert-loading`),d.innerHTML=`<span class="contact-spinner"></span> <span>${t}</span>`):e===`error`&&(d.classList.add(`alert-error`),d.innerHTML=`<i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i> <span>${t}</span>`),d.scrollIntoView({behavior:`smooth`,block:`center`})}function p(){d&&(d.style.display=`none`)}function m(e){let t=e=>String(e).padStart(2,`0`);return`${e.getFullYear()}.${t(e.getMonth()+1)}.${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}`}function h(t){let a=e.closest(`.contact-form`)||e.parentElement;e.style.display=`none`;let o=a.querySelector(`.contact-success-view`);o&&o.remove();let s=document.createElement(`div`);s.className=`contact-success-view`;let c=m(t.timestamp||new Date),l=[];t.ndaChecked&&l.push(n?`Mutual NDA Agreement`:r?`相互秘密保持契約(NDA)締結`:`상호 비밀유지계약(NDA) 체결`),t.onPremChecked&&l.push(n?`Air-Gapped On-Premises PoC`:r?`オンプレミス(閉域環境)PoC支援`:`온프레미스(망분리) 폐쇄망 PoC 지원`);let u=l.length>0?`<div class="contact-summary-row">
                    <span class="contact-summary-label">${i.labels.options}</span>
                    <span class="contact-summary-value">${l.join(`<br>`)}</span>
                   </div>`:``;s.innerHTML=`
                <div class="contact-success-icon-wrap">
                    <svg class="contact-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h3 class="contact-success-title">${i.successTitle}</h3>
                <p class="contact-success-desc">${i.successDesc(g(t.email))}</p>

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
                        <span class="contact-summary-value">${g(t.name)}</span>
                    </div>
                    ${t.company?`
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.company}</span>
                        <span class="contact-summary-value">${g(t.company)}</span>
                    </div>`:``}
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.email}</span>
                        <span class="contact-summary-value">${g(t.email)}</span>
                    </div>
                    ${t.phone?`
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.phone}</span>
                        <span class="contact-summary-value">${g(t.phone)}</span>
                    </div>`:``}
                    <div class="contact-summary-row">
                        <span class="contact-summary-label">${i.labels.interest}</span>
                        <span class="contact-summary-value">${g(t.inquiry)}</span>
                    </div>
                    ${u}
                </div>

                <div class="contact-success-actions">
                    <a href="${i.homeUrl}" class="btn btn-outline">${i.btnHome}</a>
                    <button type="button" id="btnResetInquiry" class="btn btn-primary">${i.btnNewInquiry}</button>
                </div>
            `,a.appendChild(s),a.scrollIntoView({behavior:`smooth`,block:`center`});let d=s.querySelector(`#btnResetInquiry`);d&&d.addEventListener(`click`,()=>{s.remove(),e.reset(),p(),e.style.display=`block`,a.scrollIntoView({behavior:`smooth`,block:`start`});let t=document.getElementById(`name`);t&&t.focus()})}function g(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}e.addEventListener(`submit`,async t=>{t.preventDefault(),p();let o=document.getElementById(`privacyConsent`);if(o&&!o.checked){f(`error`,i.consentRequired),o.focus();return}let s=e.querySelector(`button[type="submit"]`),c=s.innerHTML;s.disabled=!0,s.innerHTML=`<span class="contact-spinner" style="width: 16px; height: 16px; border-width: 2px; vertical-align: middle; margin-right: 8px;"></span> <span>${i.loading}</span>`,f(`loading`,i.loading);let l=document.getElementById(`name`)?document.getElementById(`name`).value.trim():``,u=document.getElementById(`company`)?document.getElementById(`company`).value.trim():``,d=document.getElementById(`email`)?document.getElementById(`email`).value.trim():``,m=document.getElementById(`phone`)?document.getElementById(`phone`).value.trim():``,g=a.filter(e=>e.checked).map(e=>e.value),_=document.getElementById(`specificProduct`)?document.getElementById(`specificProduct`).value.trim():``,v=g.length>0?g.join(`, `):i.defaultTopic;_&&(v+=` [`+_+`]`);let y=document.getElementById(`message`)?document.getElementById(`message`).value.trim():``,b=document.getElementById(`ndaRequired`)?.checked,x=document.getElementById(`onPremisesPoc`)?.checked,S=``;b&&(S+=n?`
- [Request] Mutual Non-Disclosure Agreement (NDA) required`:r?`
- [要望] 相互秘密保持契約(NDA)の締結希望`:`
- [요청] 사전 NDA(비밀유지계약) 체결 희망`),x&&(S+=n?`
- [Request] On-Premises (Air-Gapped) PoC support required`:r?`
- [要望] オンプレミス(閉域網)PoC支援希望`:`
- [요청] 온프레미스(망분리) 폐쇄망 PoC 지원 희망`);let C={name:l,email:d,subject:`[Empasy Homepage Contact] `+(u?u+` - `+l:l),content:`Company: `+u+`
Phone: `+m+`

Inquiry: `+v+(S?`

Options:`+S:``)+`

Message:
`+y};try{let e=await fetch(`https://7f4wwc40if.execute-api.ap-northeast-2.amazonaws.com/dev/email-contact-us-template-dev-sendEmail`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(C)});if(e.ok)h({name:l,company:u,email:d,phone:m,inquiry:v,ndaChecked:b,onPremChecked:x,timestamp:new Date});else throw Error(`Server responded with status: `+e.status)}catch(e){console.error(`Contact submission error:`,e),f(`error`,i.error),s.disabled=!1,s.innerHTML=c}})}});