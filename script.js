const projects = {
  vezbi: {
    title: 'Vezbi Super App', tag: 'PRODUCTION PRODUCT · ANDROID · LEADERSHIP', description: 'A unified super app connecting local businesses, communities, events and everyday services. My work at Vezbi spans Android engineering, application architecture, delivery and product collaboration as Head of the Application Department.', images: [
      ['assets/gallery/vezbi-home.png','Vezbi public-facing product experience'],['assets/gallery/vezbi-features.png','Core Vezbi experiences across Explore, Collaborate, Events and Shop']
    ]
  },
  capstone: {
    title: 'AI Accessibility & Code Compliance', tag: 'COMPUTER VISION · LLMs · AGENTS', description: 'Team Athena capstone focused on interpreting commercial bathroom floor plans against Ontario Building Code accessibility requirements. The work combined computer vision for fixture localization with LLM-based reasoning and agentic validation.', images: [
      ['assets/gallery/capstone-board.png','Team Athena capstone architecture and showcase board'],['assets/gallery/capstone-team.png','Team Athena at the capstone showcase']
    ]
  },
  object: {
    title: 'Object Detection on AWS', tag: 'AWS · OBJECT DETECTION · GUEST SPEAKER', description: 'An applied computer vision project using deep learning for object detection, deployed in an AWS environment. The project became the basis for a guest lecture at Humber Polytechnic North Campus on object detection and computer vision.', images: [
      ['assets/gallery/object-detection-result.jpeg','Detection output with confidence scores and bounding boxes'],['assets/gallery/humber-speaker.png','Humber Polytechnic guest-speaker post and presentation']
    ]
  },
  langgraph: {
    title: 'LLM Agent with LangGraph + RAG', tag: 'LANGGRAPH · RAG · LLM', description: 'A current build exploring explicit agent state, retrieval and generation nodes, vector search and context-aware responses. The goal is a structured assistant architecture that can retrieve grounded information before generating an answer.', images: [
      ['assets/gallery/langgraph-code.png','LangGraph agent implementation'],['assets/gallery/langgraph-agent.png','Agent and retrieval code in VS Code']
    ]
  },
  n8n: {
    title: 'Agent Orchestration with n8n', tag: 'N8N · AI AGENTS · ORCHESTRATION', description: 'Designed and built agentic workflows that connect LLMs, APIs, Telegram, Google Sheets, Gmail, memory and utility tools. The workflows orchestrate multi-step tasks instead of treating the LLM as an isolated chatbot.', images: [
      ['assets/gallery/n8n-workflow.png','n8n workflow with Telegram trigger, switch logic, AI agent and message output'],['assets/gallery/n8n-agent.png','n8n agent connected to Google Sheets, Gmail, calendar, calculator and messaging tools']
    ]
  },
  mnist: {
    title: 'MNIST Model Benchmark', tag: 'MACHINE LEARNING · MODEL EVALUATION', description: 'Compared multiple classification approaches across classical machine learning and neural networks, using model evaluation to understand trade-offs in accuracy, complexity and generalization.', images: [
      ['assets/gallery/mnist.png','MNIST model benchmark project interface']
    ]
  }
};

const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalTag = document.getElementById('modalTag');
const modalDescription = document.getElementById('modalDescription');
const galleryDots = document.getElementById('galleryDots');
let activeProject = null;
let activeImage = 0;

function renderModal() {
  const project = projects[activeProject];
  const item = project.images[activeImage];
  modalImage.src = item[0];
  modalImage.alt = item[1];
  modalTitle.textContent = project.title;
  modalTag.textContent = project.tag;
  modalDescription.textContent = project.description;
  galleryDots.innerHTML = project.images.map((img, i) => `<button class="dot ${i === activeImage ? 'active' : ''}" aria-label="View image ${i + 1}"></button>`).join('');
  galleryDots.querySelectorAll('.dot').forEach((dot, i) => dot.addEventListener('click', () => { activeImage = i; renderModal(); }));
}

document.querySelectorAll('[data-project]').forEach(card => card.addEventListener('click', () => {
  activeProject = card.dataset.project;
  activeImage = 0;
  renderModal();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}));

document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => { glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; });

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: 0.08 });
document.querySelectorAll('.project,.lead-card,.timeline-item,.toolkit-grid > div,.metrics > div').forEach(el => { el.classList.add('reveal'); observer.observe(el); });

// Academic image lightbox
document.querySelectorAll('.education-image').forEach((el) => {
  el.addEventListener('click', () => {
    const img = el.querySelector('img');
    const card = el.closest('.education-card');
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalImage');
    if (!img || !modal || !modalImage) return;
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    const tag = card?.querySelector('.tag');
    const title = card?.querySelector('h3');
    const desc = document.getElementById('modalDescription');
    const modalTag = document.getElementById('modalTag');
    const modalTitle = document.getElementById('modalTitle');
    const dots = document.getElementById('galleryDots');
    if (modalTag) modalTag.textContent = tag?.textContent || '';
    if (modalTitle) modalTitle.textContent = title?.textContent || '';
    if (desc) desc.textContent = '';
    if (dots) dots.innerHTML = '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  });
});
