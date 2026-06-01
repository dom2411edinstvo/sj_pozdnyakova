import re

# We will generate the complete HTML structure.

html_content = """<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Super Jump — Елена Татаурова | Интеллект-тренер, амбассадор 6 ранга</title>
    <meta name="description" content="Super Jump — интеллект-тренер Елена Татаурова. Онлайн-тренировки для перепрограммирования подсознания, снятия стресса, улучшения здоровья.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
            --bg-dark: #FDFBF7; /* Light warm background */
            --bg-card: #FFFFFF; /* White cards */
            --accent: #D4AF37; /* Classic Gold */
            --accent2: #F3E5AB; /* Soft Vanilla Gold */
            --accent-glow: rgba(212, 175, 55, 0.4);
            --accent-light: rgba(212, 175, 55, 0.15);
            --green: #4ADE80;
            --text: #2C2A28; /* Dark elegant gray for text */
            --text-light: #5A5652;
            --text-muted: #8C8884;
            --tg-color: #26A5E4;
            --wa-color: #25D366;
            
            --shadow-card: 0 10px 30px rgba(0,0,0,0.05);
            --shadow-hover: 0 15px 40px rgba(212, 175, 55, 0.2);
        }

        html { scroll-behavior: smooth; overflow-x: hidden; }

        body {
            font-family: 'Montserrat', sans-serif;
            background: var(--bg-dark);
            color: var(--text);
            line-height: 1.6;
            overflow-x: hidden;
            width: 100%;
            max-width: 100vw;
        }

        a { text-decoration: none; color: inherit; }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        /* Header */
        header {
            position: fixed; top: 0; left: 0; right: 0;
            padding: 15px 0; z-index: 100; transition: background 0.3s, box-shadow 0.3s;
        }
        header.scrolled { 
            background: rgba(253, 251, 247, 0.95); 
            backdrop-filter: blur(10px); 
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        header .container { display: flex; justify-content: space-between; align-items: center; }

        .logo { display: flex; align-items: center; gap: 12px; cursor: pointer; text-decoration: none; }
        .logo-icon {
            width: 48px; height: 48px;
            background: linear-gradient(135deg, var(--accent), var(--accent2));
            border-radius: 14px; display: flex; align-items: center; justify-content: center;
            box-shadow: 0 4px 15px var(--accent-glow);
            color: #fff;
        }
        .logo-icon svg { width: 30px; height: 30px; fill: currentColor; }
        .logo-text-group { display: flex; flex-direction: column; line-height: 1; }
        .logo-super { font-size: 14px; font-weight: 800; letter-spacing: 4px; color: var(--text); }
        .logo-jump {
            font-size: 22px; font-weight: 900; letter-spacing: 3px;
            background: linear-gradient(135deg, var(--accent), #B8860B);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
            margin-top: 1px;
        }

        nav { display: flex; gap: 20px; align-items: center; }
        nav a { font-size: 12px; font-weight: 600; letter-spacing: 0.5px; transition: color 0.3s; position: relative; color: var(--text-light); text-transform: uppercase;}
        nav a:hover { color: var(--accent); }
        nav a::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: var(--accent); transition: width 0.3s; }
        nav a:hover::after { width: 100%; }

        .header-btn {
            padding: 12px 25px; background: linear-gradient(135deg, var(--accent), var(--accent2));
            border-radius: 30px; font-size: 13px; font-weight: 700; letter-spacing: 1px;
            transition: transform 0.3s, box-shadow 0.3s; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        .header-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-hover); }

        .menu-btn {
            display: none; width: 35px; height: 24px; flex-direction: column; justify-content: space-between;
            cursor: pointer; background: none; border: none; z-index: 101;
        }
        .menu-btn span { height: 3px; background: var(--text); border-radius: 2px; transition: 0.3s; }
        .menu-btn.active span:nth-child(1) { transform: rotate(45deg) translate(7px, 7px); }
        .menu-btn.active span:nth-child(2) { opacity: 0; }
        .menu-btn.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -7px); }

        .mobile-menu {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: var(--bg-dark); z-index: 99;
            display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px;
            opacity: 0; visibility: hidden; transition: 0.3s;
        }
        .mobile-menu.active { opacity: 1; visibility: visible; }
        .mobile-menu a { font-size: 24px; font-weight: 700; letter-spacing: 2px; color: var(--text); }

        /* Hero */
        .hero {
            min-height: 100vh; display: flex; align-items: center;
            position: relative; overflow: hidden; padding: 120px 0 80px;
        }
        .hero-bg {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(243, 229, 171, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 60% 80%, rgba(255, 255, 255, 0.5) 0%, transparent 40%);
            z-index: 0;
        }
        .hero-content {
            position: relative; z-index: 1;
            display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center;
        }
        .hero-badge {
            display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px;
            background: var(--accent-light); border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 30px; font-size: 12px; font-weight: 700; letter-spacing: 2px;
            color: #B8860B; margin-bottom: 25px; text-transform: uppercase;
        }
        .hero-badge::before {
            content: ''; width: 8px; height: 8px; background: var(--accent);
            border-radius: 50%; animation: blink 1.5s infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        .hero h1 {
            font-size: clamp(32px, 4.5vw, 52px);
            font-weight: 900; line-height: 1.2; margin-bottom: 25px; color: var(--text);
        }
        .hero h1 span {
            background: linear-gradient(135deg, var(--accent), #B8860B);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .hero-desc { font-size: 18px; color: var(--text-light); margin-bottom: 35px; max-width: 500px; font-weight: 500;}
        
        .hero-buttons { display: flex; gap: 15px; flex-wrap: wrap; }
        
        .hero-gift-note {
            margin-top: 20px; font-size: 14px; color: #3b82f6; font-weight: 600;
            display: flex; align-items: center; gap: 8px;
        }

        .btn {
            display: inline-flex; align-items: center; gap: 10px; padding: 16px 35px;
            border-radius: 50px; font-size: 14px; font-weight: 700; letter-spacing: 1px;
            transition: all 0.3s; cursor: pointer; border: none; text-transform: uppercase;
        }
        .btn-primary { 
            background: linear-gradient(135deg, var(--accent), var(--accent2)); 
            color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: var(--shadow-hover); }
        .btn-secondary { 
            background: transparent; border: 2px solid var(--accent); color: var(--accent); 
        }
        .btn-secondary:hover { background: var(--accent-light); }

        .hero-image { position: relative; display: flex; justify-content: center; }
        .hero-img-wrap {
            position: relative; z-index: 2; border-radius: 30px; overflow: hidden;
            box-shadow: 0 20px 50px rgba(0,0,0,0.1);
            border: 8px solid #fff;
        }
        .hero-img-wrap img { width: 100%; max-width: 450px; display: block; object-fit: cover; aspect-ratio: 3/4;}
        
        .hero-stats {
            position: absolute; z-index: 3; background: #fff; padding: 15px 25px;
            border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            display: flex; align-items: center; gap: 15px; border: 1px solid rgba(212, 175, 55, 0.2);
        }
        .stat-1 { bottom: 30px; left: -30px; }
        .stat-2 { top: 30px; right: -30px; }
        .stat-icon { font-size: 24px; }
        .stat-info span { display: block; font-size: 12px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;}
        .stat-info strong { font-size: 18px; color: var(--text); font-weight: 800; }

        /* Sections */
        section { padding: 100px 0; position: relative; }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-tag {
            display: inline-block; padding: 5px 15px; background: var(--accent-light);
            color: #B8860B; border-radius: 20px; font-size: 12px; font-weight: 700;
            letter-spacing: 1px; margin-bottom: 15px; text-transform: uppercase;
        }
        .section-title { font-size: clamp(28px, 4vw, 42px); font-weight: 900; color: var(--text); line-height: 1.2; margin-bottom: 20px;}
        .section-title span { color: var(--accent); }
        .section-desc { font-size: 16px; color: var(--text-light); max-width: 700px; margin: 0 auto; }

        /* Video / Message */
        .message-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; }
        .message-content h3 { font-size: 28px; font-weight: 800; margin-bottom: 20px; }
        .message-content p { color: var(--text-light); margin-bottom: 20px; font-size: 16px; }
        .quote-box {
            padding: 25px; background: #fff; border-left: 4px solid var(--accent);
            border-radius: 0 15px 15px 0; margin: 30px 0; font-style: italic;
            color: var(--text); font-weight: 500; box-shadow: var(--shadow-card);
        }
        
        .video-wrapper {
            position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;
            border-radius: 20px; box-shadow: var(--shadow-card); background: #000;
        }
        .video-wrapper iframe, .video-wrapper video {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;
        }
        .vp-poster {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover; background-position: center; cursor: pointer; z-index: 2;
        }
        .vp-poster::after {
            content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.3); transition: background 0.3s;
        }
        .vp-poster:hover::after { background: rgba(0,0,0,0.1); }
        .play-btn {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 80px; height: 80px; background: rgba(212, 175, 55, 0.9);
            border-radius: 50%; display: flex; align-items: center; justify-content: center;
            z-index: 3; box-shadow: 0 0 30px rgba(212, 175, 55, 0.5); transition: 0.3s;
            color: #fff;
        }
        .vp-poster:hover .play-btn { transform: translate(-50%, -50%) scale(1.1); background: var(--accent); }
        .play-btn svg { width: 30px; height: 30px; fill: currentColor; margin-left: 5px; }

        /* Features */
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .feature-card {
            background: var(--bg-card); padding: 40px 30px; border-radius: 25px;
            text-align: center; transition: 0.3s; border: 1px solid rgba(0,0,0,0.03);
            box-shadow: var(--shadow-card);
        }
        .feature-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); border-color: rgba(212, 175, 55, 0.2); }
        .feature-icon {
            width: 70px; height: 70px; background: var(--accent-light);
            border-radius: 50%; display: flex; align-items: center; justify-content: center;
            font-size: 32px; margin: 0 auto 20px;
        }
        .feature-card h4 { font-size: 20px; font-weight: 800; margin-bottom: 15px; }
        .feature-card p { color: var(--text-light); font-size: 15px; }

        /* Video Reviews */
        .reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .review-card {
            background: var(--bg-card); border-radius: 20px; overflow: hidden;
            box-shadow: var(--shadow-card); border: 1px solid rgba(0,0,0,0.03);
            display: flex; flex-direction: column;
        }
        .review-video {
            position: relative; padding-bottom: 100%; /* Square videos for vertical/shorts feel or 56.25% for wide */
            background: #000;
        }
        .review-poster {
            position: absolute; top:0; left:0; width:100%; height:100%;
            background-size: cover; background-position: center; cursor: pointer;
        }
        .review-poster::after {
            content: ''; position: absolute; top:0; left:0; right:0; bottom:0;
            background: rgba(0,0,0,0.2); transition: 0.3s;
        }
        .review-poster:hover::after { background: rgba(0,0,0,0.4); }
        .review-poster .play-btn { width: 60px; height: 60px; }
        .review-content { padding: 25px; flex-grow: 1; }
        .review-stars { color: var(--accent); font-size: 18px; margin-bottom: 10px; letter-spacing: 2px;}
        .review-text { font-size: 15px; font-weight: 600; color: var(--text); }
        .review-author { font-size: 13px; color: var(--text-muted); margin-top: 10px; }

        /* Bio */
        .bio-section { background: #fff; border-radius: 40px; padding: 60px; box-shadow: var(--shadow-card); }
        .bio-grid { display: grid; grid-template-columns: 350px 1fr; gap: 50px; align-items: center; }
        .bio-img { width: 100%; border-radius: 30px; box-shadow: 0 15px 40px rgba(0,0,0,0.1); object-fit: cover; aspect-ratio: 4/5;}
        .bio-content h2 { font-size: 36px; font-weight: 900; margin-bottom: 10px; }
        .bio-content .bio-title { color: var(--accent); font-weight: 700; font-size: 18px; margin-bottom: 25px; }
        .bio-content p { color: var(--text-light); margin-bottom: 20px; font-size: 16px; }
        .bio-stats { display: flex; gap: 30px; margin-top: 30px; margin-bottom: 30px; padding-bottom: 30px; border-bottom: 1px solid #eee;}
        .b-stat h4 { font-size: 32px; font-weight: 900; color: var(--text); line-height: 1; margin-bottom: 5px; }
        .b-stat p { font-size: 13px; color: var(--text-muted); text-transform: uppercase; font-weight: 600; margin: 0;}
        .cert-list { display: flex; flex-wrap: wrap; gap: 10px; }
        .cert-tag { padding: 8px 15px; background: var(--bg-dark); border-radius: 20px; font-size: 13px; font-weight: 600; color: var(--text); border: 1px solid #eee;}

        /* Contact Section */
        .contact-wrap {
            background: #fff; border-radius: 40px; padding: 60px;
            box-shadow: var(--shadow-card); display: grid; grid-template-columns: 1fr 1fr; gap: 50px;
        }
        .contact-info h2 { font-size: 36px; font-weight: 900; margin-bottom: 20px; }
        .gift-box {
            background: var(--accent-light); border-left: 4px solid var(--accent);
            padding: 25px; border-radius: 0 15px 15px 0; margin-top: 30px;
        }
        .gift-box h4 { font-size: 18px; font-weight: 800; color: var(--text); margin-bottom: 10px; display: flex; align-items: center; gap: 10px;}
        .gift-box p { font-size: 14px; color: var(--text-light); }
        
        .form-group { margin-bottom: 20px; }
        .form-control {
            width: 100%; padding: 18px 25px; background: #f9f8f6; border: 1px solid #eee;
            border-radius: 15px; font-family: inherit; font-size: 15px; color: var(--text);
            transition: 0.3s; outline: none;
        }
        .form-control:focus { border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-light); background: #fff;}
        .submit-btn {
            width: 100%; padding: 20px; background: linear-gradient(135deg, var(--accent), var(--accent2));
            border: none; border-radius: 15px; font-size: 16px; font-weight: 800; letter-spacing: 1px;
            color: #fff; cursor: pointer; transition: 0.3s; text-transform: uppercase;
        }
        .submit-btn:hover { transform: translateY(-3px); box-shadow: var(--shadow-hover); }

        /* Footer */
        footer { background: #fff; padding: 40px 0; text-align: center; border-top: 1px solid #eee; }
        .footer-links { display: flex; justify-content: center; gap: 20px; margin: 20px 0; }
        .footer-links a { color: var(--text-muted); font-size: 14px; font-weight: 600; transition: 0.3s; }
        .footer-links a:hover { color: var(--accent); }
        .copyright { color: var(--text-muted); font-size: 13px; }

        /* Toast */
        .toast {
            position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px);
            background: #fff; color: var(--text); padding: 15px 30px; border-radius: 30px;
            font-weight: 600; font-size: 14px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            opacity: 0; visibility: hidden; transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index: 1000;
            display: flex; align-items: center; gap: 10px; border-left: 5px solid var(--accent);
        }
        .toast.show { transform: translateX(-50%) translateY(0); opacity: 1; visibility: visible; }
        .toast.success { border-left-color: var(--green); }
        .toast.error { border-left-color: #ef4444; }

        /* Responsive */
        @media (max-width: 991px) {
            .hero-content, .message-grid, .bio-grid, .contact-wrap { grid-template-columns: 1fr; }
            .hero { padding: 100px 0 60px; text-align: center; }
            .hero-buttons { justify-content: center; }
            .hero-stats { display: none; }
            .hero-img-wrap img { margin: 0 auto; }
            .bio-img { max-width: 400px; margin: 0 auto; }
        }
        @media (max-width: 768px) {
            nav { display: none; }
            .menu-btn { display: flex; }
            .header-btn { display: none; }
            .contact-wrap { padding: 40px 20px; }
            .bio-section { padding: 40px 20px; }
            .hero h1 { font-size: 32px; }
        }
    </style>
</head>
<body>

    <!-- Header -->
    <header id="header">
        <div class="container">
            <a href="#" class="logo" id="logoHome">
                <div class="logo-icon">
                    <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="logo-text-group">
                    <span class="logo-super">SUPER</span>
                    <span class="logo-jump">JUMP</span>
                </div>
            </a>

            <nav>
                <a href="#about">О методе</a>
                <a href="#benefits">Результаты</a>
                <a href="#reviews">Отзывы</a>
                <a href="#author">Об авторе</a>
            </nav>

            <a href="#contact" class="header-btn">ЗАПИСАТЬСЯ</a>

            <button class="menu-btn" id="menuBtn">
                <span></span><span></span><span></span>
            </button>
        </div>
    </header>

    <div class="mobile-menu" id="mobileMenu">
        <a href="#about" class="mob-link">О методе</a>
        <a href="#benefits" class="mob-link">Результаты</a>
        <a href="#reviews" class="mob-link">Отзывы</a>
        <a href="#author" class="mob-link">Об авторе</a>
        <a href="#contact" class="header-btn" style="display:inline-block; margin-top:20px;">ЗАПИСАТЬСЯ</a>
    </div>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-bg"></div>
        <div class="container hero-content">
            <div class="hero-text">
                <div class="hero-badge">ОНЛАЙН-ТРЕНИРОВКИ • ПО ВСЕМУ МИРУ</div>
                <h1>Перепрограммируй подсознание с <span>Еленой Татауровой</span></h1>
                <p class="hero-desc">Комплекс интеллектуальных упражнений — решайте психологические проблемы, улучшайте здоровье и достигайте жизненных целей онлайн с женственным подходом.</p>
                
                <div class="hero-buttons">
                    <a href="#contact" class="btn btn-primary">Попробовать бесплатно</a>
                    <a href="#about" class="btn btn-secondary">Узнать больше</a>
                </div>
                
                <div class="hero-gift-note">
                    🎁 Книга «Самое важное о вашем интеллекте» — в подарок
                </div>
            </div>

            <div class="hero-image">
                <div class="hero-img-wrap">
                    <img src="https://sun9-73.userapi.com/s/v1/ig2/ZS0QyFI1zNPnJgGsZmoJNLnM1qG1HnjgMCKgDUlqXcujC_C26TArZ9MZZrbtJygreNbK_0Yy_wKqV5xZF_SiIizI.jpg?quality=95&as=32x33,48x49,72x74,108x111,160x164,240x246,360x370,480x493,540x554,640x657,720x739,1080x1109,1280x1314,1440x1478,2494x2560&from=bu&u=9idFNcVlJ-H2LWJ5KJXui8yfIFX-n7hii53-6ISb6Hg&cs=240x0" alt="Елена Татаурова - Интеллект-тренер">
                </div>
                
                <div class="hero-stats stat-1">
                    <div class="stat-icon">🎯</div>
                    <div class="stat-info">
                        <span>Стаж работы</span>
                        <strong>7+ лет</strong>
                    </div>
                </div>
                
                <div class="hero-stats stat-2">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-info">
                        <span>Статус</span>
                        <strong>Амбассадор 6 ранга</strong>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about">
        <div class="container">
            <div class="message-grid">
                <div class="message-video">
                    <div class="video-wrapper">
                        <!-- We mock the video player with a placeholder poster -->
                        <div class="vp-poster" style="background-image: url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80');" onclick="this.innerHTML='<iframe src=\'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1\' allow=\'autoplay; encrypted-media\' allowfullscreen></iframe>'">
                            <div class="play-btn">
                                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="message-content">
                    <div class="section-tag">Личное обращение</div>
                    <h3>Ключи к изменению вашей судьбы — уже в ваших руках</h3>
                    <p>Посмотрите это видео, в котором Елена Татаурова — сертифицированный мастер, Амбассадор 6 ранга — объясняет, как комплекс упражнений Super Jump запускает глубинные перемены в сознании, теле и жизни в целом.</p>
                    
                    <div class="quote-box">
                        «Каждый из нас носит в себе огромный потенциал. Моя задача — бережно помочь вам раскрыть его, убрать внутренние блоки и выйти на новый уровень жизни. Всё начинается с одного решения.»
                    </div>
                    
                    <a href="#contact" class="btn btn-primary" style="margin-top: 10px;">ЗАПИСАТЬСЯ НА ЗАНЯТИЕ</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section id="benefits" style="background: #fff;">
        <div class="container">
            <div class="section-header">
                <div class="section-tag">Базовый инструмент</div>
                <h2 class="section-title">Перепрограммирование <span>подсознания</span></h2>
                <p class="section-desc">В основе жизненных проблем — разрушительные программы. Теперь у вас есть возможность их перезаписать благодаря комплексу Super Jump под руководством Елены Татауровой.</p>
            </div>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">✨</div>
                    <h4>Снятие стресса</h4>
                    <p>Улучшение настроения, избавление от хронического напряжения и тревожности.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⚖️</div>
                    <h4>Снижение веса</h4>
                    <p>Нормализация веса через работу с подсознательными установками о теле и питании.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔋</div>
                    <h4>Восстановление энергии</h4>
                    <p>Повышение жизненного тонуса, выход из апатии и эмоционального выгорания.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">☯️</div>
                    <h4>Внутренний баланс</h4>
                    <p>Обретение глубокой внутренней гармонии и непоколебимой уверенности в себе.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Reviews Section (Video Testimonials) -->
    <section id="reviews">
        <div class="container">
            <div class="section-header">
                <div class="section-tag">Реальные истории</div>
                <h2 class="section-title">Видеоотзывы <span>участников</span></h2>
                <p class="section-desc">Послушайте истории людей, которые уже прошли тренировки Super Jump и кардинально изменили свою жизнь к лучшему.</p>
            </div>
            
            <div class="reviews-grid">
                <!-- Review 1 -->
                <div class="review-card">
                    <div class="review-video">
                        <div class="review-poster" style="background-image: url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80');" onclick="this.innerHTML='<iframe src=\'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1\' allow=\'autoplay; encrypted-media\' allowfullscreen style=\'width:100%;height:100%;position:absolute;top:0;left:0;border:none;\'></iframe>'">
                            <div class="play-btn"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                        </div>
                    </div>
                    <div class="review-content">
                        <div class="review-stars">★★★★★</div>
                        <div class="review-text">«Благодаря тренировкам с Еленой я избавилась от панических атак и нашла свое предназначение.»</div>
                        <div class="review-author">Мария, 34 года</div>
                    </div>
                </div>
                
                <!-- Review 2 -->
                <div class="review-card">
                    <div class="review-video">
                        <div class="review-poster" style="background-image: url('https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80');" onclick="this.innerHTML='<iframe src=\'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1\' allow=\'autoplay; encrypted-media\' allowfullscreen style=\'width:100%;height:100%;position:absolute;top:0;left:0;border:none;\'></iframe>'">
                            <div class="play-btn"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                        </div>
                    </div>
                    <div class="review-content">
                        <div class="review-stars">★★★★★</div>
                        <div class="review-text">«Всего за месяц занятий мой доход вырос вдвое. Я просто убрала блоки в голове!»</div>
                        <div class="review-author">Анна, 28 лет</div>
                    </div>
                </div>
                
                <!-- Review 3 -->
                <div class="review-card">
                    <div class="review-video">
                        <div class="review-poster" style="background-image: url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80');" onclick="this.innerHTML='<iframe src=\'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1\' allow=\'autoplay; encrypted-media\' allowfullscreen style=\'width:100%;height:100%;position:absolute;top:0;left:0;border:none;\'></iframe>'">
                            <div class="play-btn"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                        </div>
                    </div>
                    <div class="review-content">
                        <div class="review-stars">★★★★★</div>
                        <div class="review-text">«Очень женственный, чуткий и профессиональный подход. Елена — настоящий наставник.»</div>
                        <div class="review-author">Светлана, 42 года</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Bio Section -->
    <section id="author">
        <div class="container">
            <div class="bio-section">
                <div class="bio-grid">
                    <img src="https://sun9-73.userapi.com/s/v1/ig2/ZS0QyFI1zNPnJgGsZmoJNLnM1qG1HnjgMCKgDUlqXcujC_C26TArZ9MZZrbtJygreNbK_0Yy_wKqV5xZF_SiIizI.jpg?quality=95&as=32x33,48x49,72x74,108x111,160x164,240x246,360x370,480x493,540x554,640x657,720x739,1080x1109,1280x1314,1440x1478,2494x2560&from=bu&u=9idFNcVlJ-H2LWJ5KJXui8yfIFX-n7hii53-6ISb6Hg&cs=240x0" alt="Елена Татаурова" class="bio-img">
                    
                    <div class="bio-content">
                        <h2>Елена Татаурова</h2>
                        <div class="bio-title">Мастер интеллект-тренер Super Jump</div>
                        <p>Мой путь — помогать людям раскрывать свой потенциал и использовать любые ситуации во благо. Я на собственном опыте прошла через трансформацию и теперь помогаю клиентам со всего мира обрести силу, женственность и ясность.</p>
                        
                        <div class="bio-stats">
                            <div class="b-stat">
                                <h4>7+</h4>
                                <p>Лет опыта</p>
                            </div>
                            <div class="b-stat">
                                <h4>6</h4>
                                <p>Ранг Амбассадора</p>
                            </div>
                            <div class="b-stat">
                                <h4>∞</h4>
                                <p>Учеников</p>
                            </div>
                        </div>
                        
                        <h4 style="margin-bottom: 15px; font-size: 16px;">Статусы и достижения:</h4>
                        <div class="cert-list">
                            <span class="cert-tag">Амбассадор 6 ранга</span>
                            <span class="cert-tag">Мастер интеллект-тренер</span>
                            <span class="cert-tag">Личное окружение лидеров</span>
                            <span class="cert-tag">Эксперт по подсознанию</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Form Section -->
    <section id="contact" style="background: #fff;">
        <div class="container">
            <div class="contact-wrap">
                <div class="contact-info">
                    <div class="section-tag">Первый шаг</div>
                    <h2>Начните свою трансформацию</h2>
                    <p class="section-desc" style="margin: 0; text-align: left;">Оставьте заявку на бесплатную консультацию. Мы подберем удобное время для звонка, и я отвечу на все ваши вопросы о тренировках.</p>
                    
                    <div class="gift-box">
                        <h4>🎁 ПОДАРОК ДЛЯ ВАС</h4>
                        <p>После отправки заявки вы получите электронную книгу <strong>«Самое важное о вашем интеллекте»</strong> совершенно бесплатно!</p>
                    </div>
                </div>
                
                <div class="contact-form-container">
                    <form id="contactForm">
                        <div class="form-group">
                            <input type="text" id="nameInput" class="form-control" placeholder="Ваше имя" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="phoneInput" class="form-control" placeholder="+7 (999) 000-00-00" required>
                        </div>
                        <div class="form-group">
                            <input type="text" id="cityInput" class="form-control" placeholder="Ваш город">
                        </div>
                        <div class="form-group">
                            <button type="submit" id="submitBtn" class="submit-btn">Получить консультацию и подарок</button>
                        </div>
                        <p style="font-size: 12px; color: var(--text-muted); text-align: center; margin-top: 15px;">
                            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="logo" style="justify-content: center; pointer-events: none;">
                <div class="logo-icon" style="width: 36px; height: 36px; border-radius: 10px;">
                    <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="logo-text-group">
                    <span class="logo-super" style="font-size: 10px;">SUPER</span>
                    <span class="logo-jump" style="font-size: 16px;">JUMP</span>
                </div>
            </div>
            
            <div class="footer-links">
                <a href="#about">О методе</a>
                <a href="#reviews">Отзывы</a>
                <a href="#author">Об авторе</a>
                <a href="#">Политика конфиденциальности</a>
            </div>
            
            <div class="copyright">
                © 2024-2026 Елена Татаурова. Все права защищены.
            </div>
        </div>
    </footer>

    <!-- Toast Notification -->
    <div id="toast" class="toast"></div>

    <script>
        // Header Scroll
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });

        // Mobile Menu
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobLinks = document.querySelectorAll('.mob-link');

        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        mobLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Phone Mask
        const phoneInput = document.getElementById('phoneInput');
        phoneInput.value = '+7 ';
        phoneInput.addEventListener('input', function(e) {
            let val = this.value.replace(/\D/g, '');
            if (val.length > 0 && (val[0] === '7' || val[0] === '8')) val = val.substring(1);
            val = val.substring(0, 10);
            let f = '+7 ';
            if (val.length > 0) f += '(' + val.substring(0, 3);
            if (val.length >= 3) f += ') ' + val.substring(3, 6);
            if (val.length >= 6) f += '-' + val.substring(6, 8);
            if (val.length >= 8) f += '-' + val.substring(8, 10);
            this.value = f;
        });
        phoneInput.addEventListener('focus', function() {
            if (this.value === '' || this.value === '+7') this.value = '+7 ';
            setTimeout(() => { this.selectionStart = this.selectionEnd = this.value.length; }, 10);
        });

        // Form Submit Mock
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const toast = document.getElementById('toast');

        function showToast(msg, type = 'success') {
            toast.textContent = msg;
            toast.className = 'toast ' + type;
            void toast.offsetWidth;
            toast.classList.add('show');
            setTimeout(() => { toast.classList.remove('show'); }, 5000);
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('nameInput').value.trim();
            const phone = document.getElementById('phoneInput').value.trim().replace(/\D/g, '');

            if (name.length < 2) {
                showToast('Пожалуйста, введите корректное имя', 'error');
                return;
            }
            if (phone.length < 11) {
                showToast('Пожалуйста, введите корректный номер', 'error');
                return;
            }

            const origText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'ОТПРАВКА...';

            // Mock API Call
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = origText;
                contactForm.reset();
                phoneInput.value = '+7 ';
                showToast('Заявка успешно отправлена! Елена скоро свяжется с вами и отправит подарок.', 'success');
            }, 1500);
        });
    </script>
</body>
</html>
"""

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("index.html successfully created.")
