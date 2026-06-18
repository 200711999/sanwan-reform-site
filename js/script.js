// JavaScript功能实现

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化 AOS 动画库（如果存在）
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // 初始化轮播图
    initCarousel();
    
    // 初始化导航菜单
    initNavbar();
    
    // 初始化注册表单
    initRegisterForm();
    
    // 初始化登录表单
    initLoginForm();
    
    // 初始化知识问答
    initQuiz();
    
    // 初始化图片懒加载
    initLazyLoading();
    
    // 添加返回顶部按钮
    addBackToTopButton();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化视差滚动
    initParallax();
    
    // 初始化暗色模式切换
    initThemeToggle();
    
    // 初始化粒子背景
    initParticles();
});

// 轮播图功能
function initCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-inner .carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    const totalItems = carouselItems.length;
    let interval;
    
    // 初始化轮播
    function startCarousel() {
        interval = setInterval(nextSlide, 4000);
    }
    
    // 停止轮播
    function stopCarousel() {
        clearInterval(interval);
    }
    
    // 显示指定幻灯片
    function showSlide(index) {
        // 确保索引在有效范围内
        if (index < 0) {
            currentIndex = totalItems - 1;
        } else if (index >= totalItems) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        // 隐藏所有幻灯片
        carouselItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // 更新指示器
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // 显示当前幻灯片
        carouselItems[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }
    
    // 下一张幻灯片
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopCarousel();
            startCarousel();
        });
    });
    
    // 左右按钮点击事件
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopCarousel();
            startCarousel();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopCarousel();
            startCarousel();
        });
    }
    
    // 鼠标悬停时停止轮播，离开时继续
    if (carouselItems.length > 0) {
        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', stopCarousel);
        carousel.addEventListener('mouseleave', startCarousel);
    }
    
    // 开始轮播
    startCarousel();
}

// 导航菜单功能
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
    
    // 检查是否为移动端并应用相应样式
    function updateNavbarForScreenSize() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            navLinks.classList.add('mobile-menu');
        } else {
            navLinks.classList.remove('mobile-menu');
        }
    }
    
    // 初始化时检查屏幕尺寸
    updateNavbarForScreenSize();
    
    if (hamburger && navLinks) {
        // 点击汉堡菜单或菜单文字时切换菜单
        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            
            // 动画效果
            hamburger.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        };

        hamburger.addEventListener('click', toggleMenu);
        
        // 点击菜单文字也触发菜单
        const menuText = hamburger.querySelector('.menu-text');
        if (menuText) {
            menuText.addEventListener('click', toggleMenu);
        }
        
        // 点击遮罩层关闭菜单
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
        
        // 点击导航链接后关闭菜单
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // 监听窗口大小变化
        window.addEventListener('resize', updateNavbarForScreenSize);
    }
}

// 注册表单功能
function initRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 获取表单数据
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // 表单验证
            if (password !== confirmPassword) {
                alert('两次输入的密码不一致！');
                return;
            }
            
            if (password.length < 6) {
                alert('密码长度不能少于6位！');
                return;
            }
            
            // 模拟注册成功
            // 在实际项目中，这里应该发送AJAX请求到服务器
            alert('注册成功！');
            registerForm.reset();
            
            // 跳转到登录页面
            window.location.href = 'login.html';
        });
    }
}

// 登录表单功能
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 获取表单数据
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            
            // 表单验证
            if (!username || !password) {
                alert('请输入用户名和密码！');
                return;
            }
            
            // 模拟登录成功
            // 在实际项目中，这里应该发送AJAX请求到服务器
            alert('登录成功！');
            
            // 跳转到首页
            window.location.href = '../index.html';
        });
    }
}

// 知识问答功能
function initQuiz() {
    const submitBtn = document.getElementById('submit-quiz');
    const resetBtn = document.getElementById('reset-quiz');
    const quizResult = document.getElementById('quiz-result');

    if (submitBtn && resetBtn && quizResult) {
        // 正确答案和答案解释
        const correctAnswers = {
            q1: 'a', // 1927年
            q2: 'a', // 支部建在连上
            q3: 'a', // 党指挥枪
            q4: 'b', // 秋收起义
            q5: 'd'  // 解决了红军的生存问题
        };

        const answerExplanations = {
            q1: 'A. 1927年 - 三湾改编发生在1927年9月29日至30日',
            q2: 'A. 支部建在连上 - 这是三湾改编的核心内容之一',
            q3: 'A. 党指挥枪 - 三湾改编确立了党对军队的绝对领导',
            q4: 'B. 秋收起义 - 三湾改编是在秋收起义失败后进行的战略调整',
            q5: 'D. 解决了红军的生存问题 - 其他三项都是三湾改编的历史意义'
        };

        submitBtn.addEventListener('click', () => {
            let score = 0;
            let totalQuestions = Object.keys(correctAnswers).length;
            let resultHTML = '<h3>测试结果</h3>';

            // 检查答案并显示结果
            Object.keys(correctAnswers).forEach((question, index) => {
                const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
                const questionNum = index + 1;
                const questionElement = document.getElementById(`question${questionNum}`);
                const questionTitle = questionElement.querySelector('h3').textContent;

                if (userAnswer) {
                    if (userAnswer.value === correctAnswers[question]) {
                        score++;
                        resultHTML += `<div class="answer-result correct">
                            <p><strong>第${questionNum}题: ${questionTitle}</strong></p>
                            <p class="user-answer">你的答案: ${userAnswer.nextElementSibling.textContent} ✅ 正确</p>
                        </div>`;
                    } else {
                        resultHTML += `<div class="answer-result incorrect">
                            <p><strong>第${questionNum}题: ${questionTitle}</strong></p>
                            <p class="user-answer">你的答案: ${userAnswer.nextElementSibling.textContent} ❌ 错误</p>
                            <p class="correct-answer">正确答案: ${answerExplanations[question]}</p>
                        </div>`;
                    }
                } else {
                    resultHTML += `<div class="answer-result unanswered">
                        <p><strong>第${questionNum}题: ${questionTitle}</strong></p>
                        <p class="user-answer">未作答</p>
                        <p class="correct-answer">正确答案: ${answerExplanations[question]}</p>
                    </div>`;
                }
            });

            // 显示总分
            const percentage = Math.round((score / totalQuestions) * 100);
            let scoreMessage = '';
            if (percentage >= 90) {
                scoreMessage = '优秀！';
            } else if (percentage >= 80) {
                scoreMessage = '良好！';
            } else if (percentage >= 60) {
                scoreMessage = '及格。';
            } else {
                scoreMessage = '需要继续学习。';
            }

            resultHTML = `<h3>测试完成！得分: ${score}/${totalQuestions} (${percentage}%) - ${scoreMessage}</h3>` + resultHTML;

            quizResult.innerHTML = resultHTML;
            quizResult.classList.add('show');

            // 滚动到结果区域
            quizResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        resetBtn.addEventListener('click', () => {
            // 清除所有选择
            const radioButtons = document.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => {
                radio.checked = false;
            });

            // 隐藏结果
            quizResult.classList.remove('show');
            quizResult.innerHTML = '';

            // 滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// 平滑滚动到页面顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 添加返回顶部按钮
function addBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.setAttribute('title', '返回顶部');
    
    document.body.appendChild(button);
    
    // 滚动事件监听
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });
    
    // 点击事件
    button.addEventListener('click', scrollToTop);
}

// 初始化图片懒加载功能
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imgOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 50px 0px'
    };
    
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imgObserver.unobserve(img);
        });
    }, imgOptions);
    
    images.forEach(image => {
        imgObserver.observe(image);
    });
}

// 表单输入验证
function validateInput(input) {
    const type = input.type;
    const value = input.value;
    
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    } else if (type === 'password') {
        return value.length >= 6;
    } else {
        return value.trim().length > 0;
    }
}

// 添加表单验证事件
function addFormValidation(form) {
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!validateInput(input)) {
                input.style.borderColor = '#c62828';
            } else {
                input.style.borderColor = '#4caf50';
            }
        });
        
        input.addEventListener('input', () => {
            if (validateInput(input)) {
                input.style.borderColor = '#4caf50';
            }
        });
    });
}

// 打开灯箱
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        if (lightboxCaption) {
            lightboxCaption.textContent = caption || '';
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 关闭灯箱
function closeLightbox(event) {
    if (event.target.classList.contains('lightbox') || event.target.classList.contains('lightbox-close')) {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// ESC键关闭灯箱
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// 滚动动画功能
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// 视差滚动效果
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-shape');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// 暗色模式切换功能
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (!themeToggle || !themeIcon) return;
    
    // 从 localStorage 读取保存的主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    }
    
    // 切换主题
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
}

// 粒子背景效果
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // 设置画布尺寸
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 粒子类
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // 边界检测
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX *= -1;
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.speedY *= -1;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(198, 40, 40, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // 创建粒子
    function createParticles() {
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // 绘制连线
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(198, 40, 40, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        
        animationId = requestAnimationFrame(animate);
    }
    
    // 初始化
    createParticles();
    animate();
    
    // 暗色模式下调整粒子颜色
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isDarkMode = document.body.classList.contains('dark-mode');
                particles.forEach(particle => {
                    particle.opacity = isDarkMode ? particle.opacity * 1.5 : particle.opacity;
                });
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
}


