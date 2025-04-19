// مصفوفة الكلمات الإضافية
const extraWords = [
    "official", "real", "the", "world", "gram", "insta", 
    "love", "art", "photo", "digital", "creative", "life",
    "style", "fashion", "travel", "food", "music", "vibes",
    "official", "vip", "new", "best", "top", "pro", "expert",
    "king", "queen", "star", "icon", "legend", "master",
    "official", "elite", "premium", "gold", "silver", "platinum"
];

// عناصر DOM
const nameInput = document.getElementById('nameInput');
const addNumbers = document.getElementById('addNumbers');
const addUnderscore = document.getElementById('addUnderscore');
const resultBox = document.getElementById('result');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const newBtn = document.getElementById('newBtn');
const themeToggle = document.getElementById('themeToggle');
const currentYear = document.getElementById('currentYear');

// تهيئة السنة الحالية
currentYear.textContent = new Date().getFullYear();

// دالة توليد اسم مستخدم عشوائي
function generateUsername() {
    const inputValue = nameInput.value.trim();
    const useNumbers = addNumbers.checked;
    const useUnderscore = addUnderscore.checked;
    
    let username = '';
    
    // إذا لم يتم إدخال اسم، نستخدم كلمة عشوائية
    if (!inputValue) {
        username = getRandomWord();
    } else {
        username = cleanInput(inputValue);
    }
    
    // إضافة كلمة إضافية بنسبة 50%
    if (Math.random() > 0.5) {
        const randomWord = getRandomWord();
        username += useUnderscore ? `_${randomWord}` : randomWord;
    }
    
    // إضافة أرقام عشوائية إذا تم التحديد
    if (useNumbers) {
        const randomNum = Math.floor(Math.random() * 10000);
        username += useUnderscore ? `_${randomNum}` : randomNum;
    }
    
    // عرض النتيجة
    displayResult(`@${username}`);
}

// دالة تنظيف المدخلات
function cleanInput(input) {
    return input.toLowerCase()
        .replace(/\s+/g, '') // إزالة المسافات
        .replace(/[^a-z0-9_]/g, ''); // إزالة الرموز الخاصة
}

// دالة الحصول على كلمة عشوائية
function getRandomWord() {
    return extraWords[Math.floor(Math.random() * extraWords.length)];
}

// دالة عرض النتيجة
function displayResult(username) {
    resultBox.innerHTML = `
        <div class="result-content">
            <p class="result-label">اسم المستخدم المقترح:</p>
            <h3 class="username-result">${username}</h3>
            <p class="designer-credit">
                تصميم: <a href="https://www.instagram.com/black_crow_26/?hl=ar" target="_blank">محمد عبد الرزاق</a>
            </p>
        </div>
    `;
    
    // إضافة تأثير للنتيجة
    resultBox.classList.add('result-animate');
    setTimeout(() => {
        resultBox.classList.remove('result-animate');
    }, 500);
}

// دالة نسخ اسم المستخدم
function copyUsername() {
    const usernameElement = resultBox.querySelector('.username-result');
    
    if (usernameElement) {
        const username = usernameElement.textContent;
        
        navigator.clipboard.writeText(username)
            .then(() => {
                showAlert(`تم نسخ اسم المستخدم: ${username}\n\nتصميم: محمد عبد الرزاق`);
                
                // تأثير عند النسخ
                copyBtn.innerHTML = '<span>تم النسخ!</span> <i class="fas fa-check"></i>';
                copyBtn.style.background = '#4CAF50';
                setTimeout(() => {
                    copyBtn.innerHTML = '<span>نسخ اليوزر نيم</span> <i class="far fa-copy"></i>';
                    copyBtn.style.background = '#405de6';
                }, 2000);
            })
            .catch(err => {
                console.error('فشل في النسخ: ', err);
                showAlert('حدث خطأ أثناء النسخ. الرجاء المحاولة مرة أخرى.');
            });
    } else {
        showAlert('الرجاء إنشاء اسم مستخدم أولاً');
    }
}

// دالة عرض تنبيه
function showAlert(message) {
    // إنشاء عنصر التنبيه
    const alertElement = document.createElement('div');
    alertElement.className = 'custom-alert';
    alertElement.textContent = message;
    document.body.appendChild(alertElement);
    
    // إظهار التنبيه
    setTimeout(() => {
        alertElement.classList.add('show');
    }, 10);
    
    // إخفاء التنبيه بعد 3 ثواني
    setTimeout(() => {
        alertElement.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(alertElement);
        }, 300);
    }, 3000);
}

// دالة تبديل الوضع الداكن/الفاتح
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // تأثير للزر
    themeToggle.classList.add('theme-toggle-animate');
    setTimeout(() => {
        themeToggle.classList.remove('theme-toggle-animate');
    }, 300);
}

// تهيئة الوضع من localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// تهيئة الأحداث
function initEvents() {
    generateBtn.addEventListener('click', generateUsername);
    copyBtn.addEventListener('click', copyUsername);
    newBtn.addEventListener('click', generateUsername);
    themeToggle.addEventListener('click', toggleTheme);
    
    // عند الضغط على Enter في حقل الإدخال
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateUsername();
        }
    });
}

// تهيئة تأثيرات الأيقونات
function initHoverEffects() {
    const socialIcons = document.querySelectorAll('.social-link, .footer-social-link');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
    });
}

// عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initEvents();
    initHoverEffects();
    generateUsername(); // توليد اسم تلقائي عند التحميل
});