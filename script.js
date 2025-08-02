class FriendshipGreetingApp {
    constructor() {
        this.currentEffect = null;
        this.currentStyle = 'classic';
        this.currentAnimation = null;
        this.uploadedFiles = [];
        this.effectInterval = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.startDefaultEffect();
    }

    bindEvents() {
        // Form inputs
        document.getElementById('friendName').addEventListener('input', (e) => {
            this.updateFriendName(e.target.value);
        });

        document.getElementById('memories').addEventListener('input', (e) => {
            this.updateMemories(e.target.value);
        });

        document.getElementById('message').addEventListener('input', (e) => {
            this.updateMessage(e.target.value);
        });

        document.getElementById('photoUpload').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });

        // Effect buttons
        document.querySelectorAll('.effect-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setEffect(e.target.dataset.effect);
                this.setActiveButton(e.target, '.effect-btn');
            });
        });

        // Style buttons
        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setStyle(e.target.dataset.style);
                this.setActiveButton(e.target, '.style-btn');
            });
        });

        // Animation buttons
        document.querySelectorAll('.animation-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setAnimation(e.target.dataset.animation);
                this.setActiveButton(e.target, '.animation-btn');
            });
        });

        // Action buttons
        document.getElementById('createGreeting').addEventListener('click', () => {
            this.createGreeting();
        });

        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadGreeting();
        });

        document.getElementById('shareBtn').addEventListener('click', () => {
            this.shareGreeting();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetForm();
        });
    }

    setActiveButton(clickedBtn, selector) {
        document.querySelectorAll(selector).forEach(btn => {
            btn.classList.remove('active');
        });
        clickedBtn.classList.add('active');
    }

    updateFriendName(name) {
        const displayName = document.getElementById('displayName');
        displayName.textContent = name || "Your Friend's Name";
        
        if (this.currentAnimation) {
            this.applyTextAnimation(displayName, this.currentAnimation);
        }
    }

    updateMemories(memories) {
        const displayMemories = document.getElementById('displayMemories');
        const p = displayMemories.querySelector('p');
        p.textContent = memories || "Your memories will appear here...";
    }

    updateMessage(message) {
        const displayMessage = document.getElementById('displayMessage');
        const p = displayMessage.querySelector('p');
        p.textContent = message || "Your message will appear here...";
    }

    handleFileUpload(files) {
        const uploadPreview = document.getElementById('uploadPreview');
        const mediaContainer = document.getElementById('mediaContainer');
        
        uploadPreview.innerHTML = '';
        mediaContainer.innerHTML = '';
        this.uploadedFiles = [];

        if (files.length === 0) {
            mediaContainer.innerHTML = `
                <div class="placeholder-media">
                    <i class="fas fa-images"></i>
                    <p>Photos/Videos will appear here</p>
                </div>
            `;
            return;
        }

        Array.from(files).forEach((file, index) => {
            if (index < 6) { // Limit to 6 files
                this.uploadedFiles.push(file);
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    const isVideo = file.type.startsWith('video/');
                    
                    // Preview in form
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    previewItem.innerHTML = isVideo ? 
                        `<video src="${e.target.result}" controls></video>` :
                        `<img src="${e.target.result}" alt="Preview">`;
                    uploadPreview.appendChild(previewItem);
                    
                    // Display in card
                    if (index === 0) {
                        mediaContainer.innerHTML = '<div class="media-grid"></div>';
                    }
                    
                    const mediaItem = document.createElement('div');
                    mediaItem.className = 'media-item';
                    mediaItem.innerHTML = isVideo ? 
                        `<video src="${e.target.result}" controls></video>` :
                        `<img src="${e.target.result}" alt="Memory">`;
                    
                    mediaContainer.querySelector('.media-grid').appendChild(mediaItem);
                };
                
                reader.readAsDataURL(file);
            }
        });
    }

    setEffect(effect) {
        this.currentEffect = effect;
        this.clearEffects();
        
        if (this.effectInterval) {
            clearInterval(this.effectInterval);
        }
        
        switch (effect) {
            case 'hearts':
                this.createFloatingHearts();
                break;
            case 'sparkles':
                this.createSparkles();
                break;
            case 'confetti':
                this.createConfetti();
                break;
            case 'bubbles':
                this.createBubbles();
                break;
        }
    }

    setStyle(style) {
        const cardBackground = document.getElementById('cardBackground');
        
        // Remove all style classes
        cardBackground.classList.remove('classic-style', 'modern-style', 'vintage-style', 'neon-style');
        
        // Add new style class
        cardBackground.classList.add(`${style}-style`);
        this.currentStyle = style;
    }

    setAnimation(animation) {
        this.currentAnimation = animation;
        const friendName = document.getElementById('displayName');
        this.applyTextAnimation(friendName, animation);
    }

    applyTextAnimation(element, animation) {
        // Remove all animation classes
        element.classList.remove('bounce-animation', 'glow-animation', 'rainbow-animation', 'typewriter-animation');
        
        // Add new animation class
        if (animation) {
            element.classList.add(`${animation}-animation`);
        }
    }

    createFloatingHearts() {
        this.effectInterval = setInterval(() => {
            this.createFloatingElement('💕', 'heart');
        }, 800);
    }

    createSparkles() {
        this.effectInterval = setInterval(() => {
            this.createFloatingElement('✨', 'sparkle');
        }, 600);
    }

    createConfetti() {
        this.effectInterval = setInterval(() => {
            const colors = ['#ff6b9d', '#667eea', '#ffd700', '#00ff88', '#ff4757'];
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            document.getElementById('effectsContainer').appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, 300);
    }

    createBubbles() {
        this.effectInterval = setInterval(() => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.width = bubble.style.height = (Math.random() * 30 + 10) + 'px';
            bubble.style.animationDelay = Math.random() * 2 + 's';
            
            document.getElementById('effectsContainer').appendChild(bubble);
            
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, 4000);
        }, 1000);
    }

    createFloatingElement(emoji, className) {
        const element = document.createElement('div');
        element.className = className;
        element.textContent = emoji;
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 2 + 's';
        
        document.getElementById('effectsContainer').appendChild(element);
        
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 6000);
    }

    clearEffects() {
        const effectsContainer = document.getElementById('effectsContainer');
        effectsContainer.innerHTML = '';
    }

    startDefaultEffect() {
        // Start with floating hearts by default
        setTimeout(() => {
            this.setEffect('hearts');
            document.querySelector('[data-effect="hearts"]').classList.add('active');
        }, 1000);
    }

    createGreeting() {
        const friendName = document.getElementById('friendName').value;
        const memories = document.getElementById('memories').value;
        const message = document.getElementById('message').value;
        
        if (!friendName.trim()) {
            this.showNotification('Please enter your friend\'s name!', 'warning');
            return;
        }
        
        // Add a special creation animation
        const greetingCard = document.getElementById('greetingCard');
        greetingCard.style.transform = 'scale(0.95)';
        greetingCard.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            greetingCard.style.transform = 'scale(1)';
            this.showNotification('Greeting card created successfully! 🎉', 'success');
        }, 300);
        
        // Add some extra sparkle effect
        this.createCelebrationEffect();
    }

    createCelebrationEffect() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createFloatingElement('🎉', 'sparkle');
            }, i * 100);
        }
    }

    downloadGreeting() {
        // In a real app, you would use html2canvas or similar library
        this.showNotification('Download feature would be implemented with html2canvas library!', 'info');
    }

    shareGreeting() {
        if (navigator.share) {
            navigator.share({
                title: 'Friendship Day Greeting',
                text: 'Check out this beautiful friendship day greeting I created!',
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                this.showNotification('Link copied to clipboard! Share it with your friends! 📋', 'success');
            });
        }
    }

    resetForm() {
        // Reset form inputs
        document.getElementById('friendName').value = '';
        document.getElementById('memories').value = '';
        document.getElementById('message').value = '';
        document.getElementById('photoUpload').value = '';
        
        // Reset displays
        this.updateFriendName('');
        this.updateMemories('');
        this.updateMessage('');
        this.handleFileUpload([]);
        
        // Reset effects and styles
        this.clearEffects();
        this.setStyle('classic');
        this.setAnimation(null);
        
        // Reset active buttons
        document.querySelectorAll('.effect-btn, .style-btn, .animation-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Restart default effect
        this.startDefaultEffect();
        
        this.showNotification('Form reset successfully! 🔄', 'info');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: this.getNotificationColor(type),
            color: '#fff',
            padding: '15px 20px',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            zIndex: '1000',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            warning: 'exclamation-triangle',
            error: 'times-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: '#28a745',
            warning: '#ffc107',
            error: '#dc3545',
            info: '#17a2b8'
        };
        return colors[type] || '#17a2b8';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FriendshipGreetingApp();
});

// Add some extra interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to cards
    const greetingCard = document.getElementById('greetingCard');
    
    greetingCard.addEventListener('mouseenter', () => {
        greetingCard.style.transform = 'scale(1.02) rotateY(5deg)';
        greetingCard.style.transition = 'transform 0.3s ease';
    });
    
    greetingCard.addEventListener('mouseleave', () => {
        greetingCard.style.transform = 'scale(1) rotateY(0deg)';
    });
    
    // Add typing sound effect simulation
    const textInputs = document.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(input => {
        input.addEventListener('input', () => {
            // In a real app, you could play a typing sound here
            input.style.transform = 'scale(1.01)';
            setTimeout(() => {
                input.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Add random friendship quotes
    const quotes = [
        "Friendship is the only cement that will ever hold the world together. 💕",
        "A real friend is one who walks in when the rest of the world walks out. 🌟",
        "Friends are the family you choose. 👨‍👩‍👧‍👦",
        "Good friends are like stars. You don't always see them, but you know they're there. ⭐",
        "Friendship is born at that moment when one person says to another, 'What! You too?' 🤝",
        "A friend is someone who knows all about you and still loves you. ❤️"
    ];
    
    // Change quote every 10 seconds
    const quoteElement = document.querySelector('.friendship-quote');
    let quoteIndex = 0;
    
    setInterval(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteElement.textContent = quotes[quoteIndex];
            quoteElement.style.opacity = '1';
        }, 300);
    }, 10000);
});