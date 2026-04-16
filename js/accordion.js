/* AURUM NATURA - FAQ Accordion */

class Accordion {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.init();
  }

  init() {
    if (!this.container) return;

    const items = this.container.querySelectorAll('.faq-item');

    items.forEach(item => {
      const question = item.querySelector('.faq-question');

      if (question) {
        question.addEventListener('click', () => {
          this.toggleItem(item, items);
        });
      }
    });
  }

  toggleItem(item, allItems) {
    const isActive = item.classList.contains('active');

    allItems.forEach(otherItem => {
      otherItem.classList.remove('active');
      const answer = otherItem.querySelector('.faq-answer');
      if (answer) {
        answer.style.maxHeight = '0';
        answer.style.paddingTop = '0';
        answer.style.paddingBottom = '0';
      }
    });

    if (!isActive) {
      item.classList.add('active');
      const answer = item.querySelector('.faq-answer');
      if (answer) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.paddingTop = '0';
        answer.style.paddingBottom = '20px';
      }
    }
  }
}

// Initialize FAQ accordion
document.addEventListener('DOMContentLoaded', () => {
  new Accordion('.support-faq');
});
