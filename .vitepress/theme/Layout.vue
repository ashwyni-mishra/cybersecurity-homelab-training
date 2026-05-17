<script setup>
import DefaultTheme from 'vitepress/theme'
import { onMounted, ref } from 'vue'

const { Layout } = DefaultTheme

const showPopup = ref(false)

onMounted(() => {
  const accepted = localStorage.getItem('guidelines-accepted')
  if (!accepted) {
    showPopup.value = true
  }
})

function acceptGuidelines() {
  localStorage.setItem('guidelines-accepted', 'true')
  showPopup.value = false
}
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="watermark">
        <strong>EDUCATION PURPOSE ONLY</strong>
      </div>
    </template>

    <template #layout-bottom>
      <footer class="custom-footer">
        <div class="footer-content">
          <div class="footer-section">
            <h4>Ashwani Mishra</h4>
            <p>Cybersecurity Researcher & Educator</p>
          </div>
          <div class="footer-section">
            <h4>Connect</h4>
            <div class="social-links">
              <a href="https://ashwanimishra.me/" target="_blank">Website</a>
              <a href="https://github.com/ashwyni-mishra" target="_blank">GitHub</a>
              <a href="https://linkedin.com/in/ashwyni-mishra" target="_blank">LinkedIn</a>
              <a href="mailto:mishra.ashwyni@gmail.com">Email</a>
            </div>
          </div>
          <div class="footer-section">
            <h4>Feedback</h4>
            <p>Help improve this guide! <a href="https://github.com/ashwyni-mishra/cybersecurity-homelab-training/issues" target="_blank">Report Issue</a></p>
          </div>
        </div>
        <div class="footer-bottom">
          &copy; 2026 Ashwani Mishra. All rights reserved.
        </div>
      </footer>

      <div v-if="showPopup" class="modal-overlay">
        <div class="modal-content">
          <h2>Ethical Guidelines & Agreement</h2>
          <p>This curriculum is for <strong>educational purposes only</strong>. By proceeding, you agree to:</p>
          <ul>
            <li>Never use these techniques against unauthorized targets.</li>
            <li>Maintain proper lab isolation.</li>
            <li>Take full responsibility for your actions.</li>
          </ul>
          <div class="modal-actions">
            <button @click="acceptGuidelines" class="accept-btn">I Understand & Agree</button>
            <a href="https://google.com" class="decline-link">Decline</a>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style>
.watermark {
  text-align: center;
  padding: 10px;
  background-color: var(--vp-c-warning-soft);
  color: var(--vp-c-warning-1);
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  letter-spacing: 2px;
}

.custom-footer {
  margin-top: 50px;
  padding: 40px 20px;
  background-color: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}

.footer-content {
  max-width: 1152px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.footer-section h4 {
  margin-bottom: 15px;
  color: var(--vp-c-text-1);
}

.footer-section p, .footer-section a {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.social-links a:hover {
  color: var(--vp-c-brand);
}

.footer-bottom {
  text-align: center;
  margin-top: 40px;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: var(--vp-c-bg);
  padding: 40px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--vp-c-divider);
}

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.modal-content ul {
  margin: 20px 0;
  padding-left: 20px;
  color: var(--vp-c-text-2);
}

.modal-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}

.accept-btn {
  background: var(--vp-c-brand);
  color: white;
  padding: 12px 30px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: opacity 0.2s;
}

.accept-btn:hover {
  opacity: 0.9;
}

.decline-link {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}
</style>
