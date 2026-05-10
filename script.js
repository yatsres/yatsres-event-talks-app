document.addEventListener('DOMContentLoaded', () => {
    const talksData = window.TALKS_DATA; // Talks data will be embedded globally
    const scheduleContainer = document.getElementById('schedule');
    const categorySearchInput = document.getElementById('categorySearch');

    function renderTalks(filterCategory = '') {
        scheduleContainer.innerHTML = ''; // Clear current schedule

        const filteredTalks = talksData.filter(talk => {
            if (!filterCategory) return true;
            // Handle "Break" category separately for filtering
            if (talk.id === 'lunch' && filterCategory.toLowerCase() === 'break') {
                return true;
            }
            return talk.category.some(cat => cat.toLowerCase().includes(filterCategory.toLowerCase()));
        });

        filteredTalks.forEach(talk => {
            const talkCard = document.createElement('div');
            talkCard.classList.add('talk-card');
            if (talk.id === 'lunch') {
                talkCard.classList.add('break');
            }

            let speakersHtml = '';
            if (talk.speakers && talk.speakers.length > 0) {
                speakersHtml = `<h3>${talk.speakers.join(' & ')}</h3>`;
            }

            let categoryTagsHtml = '';
            if (talk.category && talk.category.length > 0) {
                categoryTagsHtml = `<div class="category-tags">${talk.category.map(cat => `<span>${cat}</span>`).join('')}</div>`;
            }

            talkCard.innerHTML = `
                <span class="time">${talk.startTime} - ${talk.endTime}</span>
                <h2>${talk.title}</h2>
                ${speakersHtml}
                ${categoryTagsHtml}
                <p>${talk.description}</p>
            `;
            scheduleContainer.appendChild(talkCard);
        });
    }

    // Initial render of all talks
    renderTalks();

    // Event listener for category search
    categorySearchInput.addEventListener('input', (event) => {
        renderTalks(event.target.value);
    });
});
