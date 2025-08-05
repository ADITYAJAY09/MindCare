// Mental Health Portal Application
class MindCareApp {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'overview';
        this.assessmentData = {
            "phq9": {
                "name": "PHQ-9 Depression Assessment",
                "description": "A 9-question assessment to screen for depression symptoms",
                "questions": [
                    "Little interest or pleasure in doing things",
                    "Feeling down, depressed, or hopeless", 
                    "Trouble falling or staying asleep, or sleeping too much",
                    "Feeling tired or having little energy",
                    "Poor appetite or overeating",
                    "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
                    "Trouble concentrating on things, such as reading the newspaper or watching television",
                    "Moving or speaking so slowly that other people could have noticed, or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
                    "Thoughts that you would be better off dead, or of hurting yourself"
                ],
                "scale": ["Not at all", "Several days", "More than half the days", "Nearly every day"],
                "scoring": {
                    "0-4": "Minimal depression",
                    "5-9": "Mild depression", 
                    "10-14": "Moderate depression",
                    "15-19": "Moderately severe depression",
                    "20-27": "Severe depression"
                }
            },
            "gad7": {
                "name": "GAD-7 Anxiety Assessment",
                "description": "A 7-question assessment to screen for anxiety symptoms",
                "questions": [
                    "Feeling nervous, anxious, or on edge",
                    "Not being able to stop or control worrying",
                    "Worrying too much about different things",
                    "Trouble relaxing",
                    "Being so restless that it is hard to sit still",
                    "Becoming easily annoyed or irritable",
                    "Feeling afraid, as if something awful might happen"
                ],
                "scale": ["Not at all", "Several days", "More than half the days", "Nearly every day"],
                "scoring": {
                    "0-4": "Minimal anxiety",
                    "5-9": "Mild anxiety",
                    "10-14": "Moderate anxiety", 
                    "15-21": "Severe anxiety"
                }
            },
            "stress": {
                "name": "Stress Assessment",
                "description": "A 10-question assessment to evaluate stress levels",
                "questions": [
                    "How often have you felt stressed in the past month?",
                    "How often have you felt overwhelmed by responsibilities?",
                    "How often have you had trouble sleeping due to stress?",
                    "How often have you felt irritable or angry due to stress?",
                    "How often have you experienced physical symptoms of stress?",
                    "How often have you felt unable to cope with daily tasks?",
                    "How often have you avoided social situations due to stress?",
                    "How often have you used unhealthy coping mechanisms?",
                    "How often have you felt emotionally drained?",
                    "How often have you felt hopeless about your situation?"
                ],
                "scale": ["Never", "Rarely", "Sometimes", "Often", "Very often"],
                "scoring": {
                    "0-10": "Low stress",
                    "11-20": "Moderate stress",
                    "21-30": "High stress",
                    "31-40": "Very high stress"
                }
            },
            "sleep": {
                "name": "Sleep Quality Assessment",
                "description": "An 8-question assessment to evaluate sleep patterns",
                "questions": [
                    "How often do you have trouble falling asleep?",
                    "How often do you wake up during the night?",
                    "How often do you wake up too early and can't get back to sleep?",
                    "How often do you feel tired or sleepy during the day?",
                    "How often does poor sleep interfere with your daily activities?",
                    "How often are you satisfied with your sleep quality?",
                    "How often do you use sleep medications or aids?",
                    "How often do you feel refreshed when you wake up?"
                ],
                "scale": ["Never", "Rarely", "Sometimes", "Often", "Very often"],
                "scoring": {
                    "0-8": "Good sleep quality",
                    "9-16": "Fair sleep quality",
                    "17-24": "Poor sleep quality",
                    "25-32": "Very poor sleep quality"
                }
            }
        };
        
        this.doctorsData = [
            {
                "id": 1,
                "name": "Dr. Sarah Johnson",
                "specialization": "Psychiatrist",
                "location": "New York, NY",
                "distance": "2.5 miles",
                "rating": 4.8,
                "reviews": 127,
                "experience": "15 years",
                "fees": "$200-300",
                "languages": ["English", "Spanish"],
                "about": "Board-certified psychiatrist specializing in anxiety and depression treatment with evidence-based approaches.",
                "availability": ["Monday", "Wednesday", "Friday"]
            },
            {
                "id": 2,
                "name": "Dr. Michael Chen",
                "specialization": "Psychologist",
                "location": "Los Angeles, CA", 
                "distance": "3.1 miles",
                "rating": 4.9,
                "reviews": 89,
                "experience": "12 years",
                "fees": "$150-250",
                "languages": ["English", "Mandarin"],
                "about": "Clinical psychologist with expertise in cognitive behavioral therapy and trauma-informed care.",
                "availability": ["Tuesday", "Thursday", "Saturday"]
            },
            {
                "id": 3,
                "name": "Dr. Emily Rodriguez",
                "specialization": "Counselor",
                "location": "Chicago, IL",
                "distance": "1.8 miles", 
                "rating": 4.7,
                "reviews": 156,
                "experience": "10 years",
                "fees": "$100-180",
                "languages": ["English", "Spanish"],
                "about": "Licensed professional counselor specializing in family therapy and relationship counseling.",
                "availability": ["Monday", "Tuesday", "Thursday"]
            },
            {
                "id": 4,
                "name": "Dr. James Wilson",
                "specialization": "Therapist",
                "location": "Houston, TX",
                "distance": "4.2 miles",
                "rating": 4.6,
                "reviews": 98,
                "experience": "8 years", 
                "fees": "$120-200",
                "languages": ["English"],
                "about": "Licensed marriage and family therapist with focus on stress management and mindfulness-based interventions.",
                "availability": ["Wednesday", "Friday", "Sunday"]
            },
            {
                "id": 5,
                "name": "Dr. Lisa Thompson",
                "specialization": "Psychiatrist",
                "location": "Miami, FL",
                "distance": "2.9 miles",
                "rating": 4.9,
                "reviews": 143,
                "experience": "18 years",
                "fees": "$250-350",
                "languages": ["English", "French"],
                "about": "Adult and adolescent psychiatrist with specialization in mood disorders and medication management.",
                "availability": ["Monday", "Wednesday", "Friday"]
            }
        ];
        
        this.currentAssessment = null;
        this.currentQuestionIndex = 0;
        this.assessmentAnswers = [];
        this.progressChart = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkLoginStatus();
        this.loadUserData();
    }

    bindEvents() {
        // Authentication events
        document.getElementById('getStartedBtn').addEventListener('click', () => this.showAuthModal(true));
        document.getElementById('loginToggleBtn').addEventListener('click', () => this.showAuthModal(false));
        document.getElementById('modalOverlay').addEventListener('click', () => this.hideAuthModal());
        document.getElementById('modalClose').addEventListener('click', () => this.hideAuthModal());
        document.getElementById('switchToLogin').addEventListener('click', (e) => this.switchAuthMode(e, false));
        document.getElementById('switchToRegister').addEventListener('click', (e) => this.switchAuthMode(e, true));
        document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());

        // Navigation events
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Assessment events
        document.querySelectorAll('.assessment-card').forEach(card => {
            card.addEventListener('click', (e) => this.startAssessment(e));
        });
        
        document.getElementById('assessmentModalClose').addEventListener('click', () => this.closeAssessmentModal());
        document.getElementById('prevQuestion').addEventListener('click', () => this.previousQuestion());
        document.getElementById('nextQuestion').addEventListener('click', () => this.nextQuestion());
        document.getElementById('findDoctorsBtn').addEventListener('click', () => this.findDoctorsFromResults());
        document.getElementById('saveResultsBtn').addEventListener('click', () => this.saveAssessmentResults());

        // Doctor search events
        document.getElementById('searchDoctors').addEventListener('click', () => this.searchDoctors());

        // Profile events
        document.getElementById('profileForm').addEventListener('submit', (e) => this.updateProfile(e));
        document.getElementById('medicalForm').addEventListener('submit', (e) => this.updateMedicalInfo(e));
        document.getElementById('deleteAccountBtn').addEventListener('click', () => this.deleteAccount());

        // Tab events
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e));
        });

        // Appointment events
        document.getElementById('bookAppointmentBtn').addEventListener('click', () => this.bookAppointment());
    }

    // Authentication Methods
    showAuthModal(isRegister = true) {
        const modal = document.getElementById('authModal');
        const modalTitle = document.getElementById('modalTitle');
        const registerForm = document.getElementById('registerForm');
        const loginForm = document.getElementById('loginForm');

        if (isRegister) {
            modalTitle.textContent = 'Create Account';
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        } else {
            modalTitle.textContent = 'Login';
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        }

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    hideAuthModal() {
        document.getElementById('authModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    switchAuthMode(e, isRegister) {
        e.preventDefault();
        this.showAuthModal(isRegister);
    }

    validatePassword(password) {
        const minLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
    }

    handleRegister(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        // Validate inputs
        if (!name || !email || !password || !confirmPassword) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!this.validatePassword(password)) {
            this.showNotification('Password must be at least 8 characters with uppercase, lowercase, number, and special character', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }
        
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('mindcare_users') || '[]');
        if (existingUsers.find(user => user.email === email)) {
            this.showNotification('User already exists with this email', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            name,
            email,
            password: this.hashPassword(password),
            createdAt: new Date().toISOString(),
            profile: {
                firstName: name.split(' ')[0] || '',
                lastName: name.split(' ').slice(1).join(' ') || '',
                phone: '',
                dateOfBirth: '',
                allergies: '',
                medications: '',
                medicalHistory: '',
                emergencyContact: ''
            },
            assessments: [],
            appointments: [],
            settings: {
                dataSharing: false,
                emailNotifications: true,
                smsNotifications: false
            }
        };
        
        existingUsers.push(newUser);
        localStorage.setItem('mindcare_users', JSON.stringify(existingUsers));
        
        this.loginUser(newUser);
        this.hideAuthModal();
        this.showNotification('Account created successfully!', 'success');
    }

    handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const rememberMe = formData.get('rememberMe');
        
        if (!email || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('mindcare_users') || '[]');
        const user = users.find(u => u.email === email && u.password === this.hashPassword(password));
        
        if (!user) {
            this.showNotification('Invalid email or password', 'error');
            return;
        }
        
        this.loginUser(user);
        this.hideAuthModal();
        this.showNotification('Welcome back!', 'success');
        
        if (rememberMe) {
            localStorage.setItem('mindcare_remember', 'true');
        }
    }

    loginUser(user) {
        this.currentUser = user;
        localStorage.setItem('mindcare_current_user', JSON.stringify(user));
        this.updateUIForLoggedInUser();
        this.loadDashboard();
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('mindcare_current_user');
        localStorage.removeItem('mindcare_remember');
        this.updateUIForLoggedOutUser();
        this.showLandingPage();
        this.showNotification('Logged out successfully', 'success');
    }

    checkLoginStatus() {
        const savedUser = localStorage.getItem('mindcare_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUIForLoggedInUser();
            this.loadDashboard();
        }
    }

    updateUIForLoggedInUser() {
        document.getElementById('landingPage').classList.add('hidden');
        document.getElementById('dashboardPage').classList.remove('hidden');
        document.getElementById('userInfo').style.display = 'flex';
        document.getElementById('userName').textContent = this.currentUser.name;
        document.getElementById('sidebarUserName').textContent = this.currentUser.name;
        document.getElementById('userInitials').textContent = this.getInitials(this.currentUser.name);
    }

    updateUIForLoggedOutUser() {
        document.getElementById('landingPage').classList.remove('hidden');
        document.getElementById('dashboardPage').classList.add('hidden');
        document.getElementById('userInfo').style.display = 'none';
    }

    showLandingPage() {
        document.getElementById('landingPage').classList.remove('hidden');
        document.getElementById('dashboardPage').classList.add('hidden');
    }

    loadDashboard() {
        this.loadUserStats();
        this.loadRecentActivity();
        this.loadProgressChart();
        this.loadAssessmentHistory();
        this.loadDoctors();
        this.loadUserProfile();
    }

    getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }

    hashPassword(password) {
        // Simple hash function for demo purposes - use proper hashing in production
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }

    // Navigation Methods
    handleNavigation(e) {
        e.preventDefault();
        const section = e.target.getAttribute('data-section');
        this.showSection(section);
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
    }

    showSection(sectionName) {
        document.querySelectorAll('.dashboard__section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName + 'Section').classList.add('active');
        this.currentSection = sectionName;
    }

    // Dashboard Data Loading Methods
    loadUserStats() {
        const assessments = this.currentUser.assessments || [];
        const appointments = this.currentUser.appointments || [];
        
        document.getElementById('totalAssessments').textContent = assessments.length;
        document.getElementById('totalAppointments').textContent = appointments.length;
        
        if (assessments.length > 0) {
            const latestAssessment = assessments[assessments.length - 1];
            document.getElementById('progressScore').textContent = latestAssessment.score;
        }
        
        const upcomingAppointments = appointments.filter(apt => new Date(apt.date) > new Date());
        if (upcomingAppointments.length > 0) {
            const nextApt = upcomingAppointments[0];
            document.getElementById('nextAppointment').textContent = new Date(nextApt.date).toLocaleDateString();
        }
    }

    loadRecentActivity() {
        const activityList = document.getElementById('activityList');
        const assessments = this.currentUser.assessments || [];
        const appointments = this.currentUser.appointments || [];
        
        const activities = [];
        
        assessments.forEach(assessment => {
            activities.push({
                type: 'assessment',
                title: `Completed ${assessment.type.toUpperCase()} Assessment`,
                description: `Score: ${assessment.score} - ${assessment.interpretation}`,
                time: assessment.completedAt
            });
        });
        
        appointments.forEach(appointment => {
            activities.push({
                type: 'appointment',
                title: `Appointment with ${appointment.doctorName}`,
                description: appointment.status,
                time: appointment.createdAt
            });
        });
        
        activities.sort((a, b) => new Date(b.time) - new Date(a.time));
        
        if (activities.length === 0) {
            activityList.innerHTML = '<p class="no-activity">No recent activity</p>';
            return;
        }
        
        activityList.innerHTML = activities.slice(0, 5).map(activity => `
            <div class="activity-item">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <div class="activity-time">${this.formatDate(activity.time)}</div>
            </div>
        `).join('');
    }

    loadProgressChart() {
        const ctx = document.getElementById('progressChart').getContext('2d');
        const assessments = this.currentUser.assessments || [];
        
        if (this.progressChart) {
            this.progressChart.destroy();
        }
        
        const chartData = {
            labels: assessments.slice(-10).map(a => this.formatDate(a.completedAt, true)),
            datasets: [{
                label: 'Assessment Scores',
                data: assessments.slice(-10).map(a => a.score),
                borderColor: 'rgb(14, 165, 233)',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                tension: 0.1
            }]
        };
        
        this.progressChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Assessment Methods
    startAssessment(e) {
        const assessmentType = e.currentTarget.getAttribute('data-assessment');
        this.currentAssessment = this.assessmentData[assessmentType];
        this.currentQuestionIndex = 0;
        this.assessmentAnswers = [];
        
        this.showAssessmentModal();
        this.loadAssessmentQuestion();
    }

    showAssessmentModal() {
        const modal = document.getElementById('assessmentModal');
        const title = document.getElementById('assessmentTitle');
        
        title.textContent = this.currentAssessment.name;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Show assessment content, hide results
        document.getElementById('assessmentContent').classList.remove('hidden');
        document.getElementById('assessmentResults').classList.add('hidden');
    }

    closeAssessmentModal() {
        document.getElementById('assessmentModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.currentAssessment = null;
        this.currentQuestionIndex = 0;
        this.assessmentAnswers = [];
    }

    loadAssessmentQuestion() {
        const question = this.currentAssessment.questions[this.currentQuestionIndex];
        const questionsContainer = document.getElementById('assessmentQuestions');
        const counter = document.getElementById('questionCounter');
        const progress = document.getElementById('assessmentProgress');
        const prevBtn = document.getElementById('prevQuestion');
        const nextBtn = document.getElementById('nextQuestion');
        
        counter.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.currentAssessment.questions.length}`;
        progress.style.width = `${((this.currentQuestionIndex + 1) / this.currentAssessment.questions.length) * 100}%`;
        
        questionsContainer.innerHTML = `
            <div class="question-item">
                <h4 class="question-text">${question}</h4>
                <div class="question-options">
                    ${this.currentAssessment.scale.map((option, index) => `
                        <div class="option-item" data-value="${index}">
                            <input type="radio" name="question_${this.currentQuestionIndex}" value="${index}" id="option_${index}">
                            <label for="option_${index}">${option}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Add click handlers for options
        document.querySelectorAll('.option-item').forEach(option => {
            option.addEventListener('click', (e) => {
                const value = e.currentTarget.getAttribute('data-value');
                const radio = e.currentTarget.querySelector('input[type="radio"]');
                radio.checked = true;
                
                // Update visual selection
                document.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                
                // Store answer
                this.assessmentAnswers[this.currentQuestionIndex] = parseInt(value);
                
                // Enable next button
                nextBtn.disabled = false;
            });
        });
        
        // Restore previous answer if exists
        if (this.assessmentAnswers[this.currentQuestionIndex] !== undefined) {
            const value = this.assessmentAnswers[this.currentQuestionIndex];
            const option = document.querySelector(`[data-value="${value}"]`);
            const radio = option.querySelector('input[type="radio"]');
            radio.checked = true;
            option.classList.add('selected');
            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }
        
        // Update navigation buttons
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        if (this.currentQuestionIndex === this.currentAssessment.questions.length - 1) {
            nextBtn.textContent = 'Complete Assessment';
        } else {
            nextBtn.textContent = 'Next';
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.loadAssessmentQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.currentAssessment.questions.length - 1) {
            this.currentQuestionIndex++;
            this.loadAssessmentQuestion();
        } else {
            this.completeAssessment();
        }
    }

    completeAssessment() {
        const totalScore = this.assessmentAnswers.reduce((sum, answer) => sum + answer, 0);
        const interpretation = this.getScoreInterpretation(totalScore);
        
        this.showAssessmentResults(totalScore, interpretation);
    }

    getScoreInterpretation(score) {
        const scoring = this.currentAssessment.scoring;
        
        for (const range in scoring) {
            const [min, max] = range.split('-').map(n => parseInt(n));
            if (score >= min && score <= max) {
                return scoring[range];
            }
        }
        
        return 'Score interpretation not available';
    }

    showAssessmentResults(score, interpretation) {
        document.getElementById('assessmentContent').classList.add('hidden');
        document.getElementById('assessmentResults').classList.remove('hidden');
        
        document.getElementById('finalScore').textContent = score;
        document.getElementById('scoreInterpretation').textContent = interpretation;
        
        const recommendations = this.getRecommendations(interpretation);
        document.getElementById('recommendations').innerHTML = recommendations.map(rec => `
            <div class="recommendation-item">
                <h6>${rec.title}</h6>
                <p>${rec.description}</p>
            </div>
        `).join('');
    }

    getRecommendations(interpretation) {
        const recommendations = [];
        
        if (interpretation.includes('Severe') || interpretation.includes('High')) {
            recommendations.push({
                title: 'Seek Professional Help',
                description: 'We strongly recommend consulting with a mental health professional for proper evaluation and treatment.'
            });
            recommendations.push({
                title: 'Crisis Support',
                description: 'If you are having thoughts of self-harm, please contact the National Suicide Prevention Lifeline at 988 immediately.'
            });
        } else if (interpretation.includes('Moderate')) {
            recommendations.push({
                title: 'Consider Professional Support',
                description: 'Speaking with a therapist or counselor could be beneficial for managing your symptoms.'
            });
            recommendations.push({
                title: 'Self-Care Strategies',
                description: 'Focus on regular exercise, good sleep hygiene, and stress management techniques.'
            });
        } else {
            recommendations.push({
                title: 'Maintain Good Mental Health',
                description: 'Continue with healthy lifestyle habits and regular self-care practices.'
            });
            recommendations.push({
                title: 'Stay Connected',
                description: 'Maintain social connections and seek support when needed.'
            });
        }
        
        return recommendations;
    }

    saveAssessmentResults() {
        const totalScore = this.assessmentAnswers.reduce((sum, answer) => sum + answer, 0);
        const interpretation = this.getScoreInterpretation(totalScore);
        
        const assessmentResult = {
            id: Date.now(),
            type: Object.keys(this.assessmentData).find(key => this.assessmentData[key] === this.currentAssessment),
            name: this.currentAssessment.name,
            score: totalScore,
            interpretation: interpretation,
            answers: [...this.assessmentAnswers],
            completedAt: new Date().toISOString()
        };
        
        if (!this.currentUser.assessments) {
            this.currentUser.assessments = [];
        }
        
        this.currentUser.assessments.push(assessmentResult);
        this.updateUserData();
        
        this.closeAssessmentModal();
        this.showNotification('Assessment results saved successfully!', 'success');
        this.loadDashboard();
    }

    findDoctorsFromResults() {
        this.closeAssessmentModal();
        this.showSection('doctors');
        document.querySelector('[data-section="doctors"]').classList.add('active');
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('data-section') !== 'doctors') {
                link.classList.remove('active');
            }
        });
    }

    loadAssessmentHistory() {
        const historyContainer = document.getElementById('assessmentHistory');
        const assessments = this.currentUser.assessments || [];
        
        if (assessments.length === 0) {
            historyContainer.innerHTML = '<p class="no-history">No assessments completed yet.</p>';
            return;
        }
        
        historyContainer.innerHTML = assessments.slice().reverse().map(assessment => `
            <div class="history-item">
                <div class="history-info">
                    <h4>${assessment.name}</h4>
                    <p>Completed on ${this.formatDate(assessment.completedAt)} - ${assessment.interpretation}</p>
                </div>
                <div class="history-score">
                    <span class="score-number">${assessment.score}</span>
                    <span class="score-label">Score</span>
                </div>
            </div>
        `).join('');
    }

    // Doctor Methods
    loadDoctors() {
        this.searchDoctors();
    }

    searchDoctors() {
        const location = document.getElementById('locationFilter').value.toLowerCase();
        const specialization = document.getElementById('specializationFilter').value;
        const sortBy = document.getElementById('sortFilter').value;
        
        let filteredDoctors = [...this.doctorsData];
        
        if (location) {
            filteredDoctors = filteredDoctors.filter(doctor => 
                doctor.location.toLowerCase().includes(location)
            );
        }
        
        if (specialization) {
            filteredDoctors = filteredDoctors.filter(doctor => 
                doctor.specialization === specialization
            );
        }
        
        // Sort doctors
        filteredDoctors.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'distance':
                    return parseFloat(a.distance) - parseFloat(b.distance);
                case 'experience':
                    return parseInt(b.experience) - parseInt(a.experience);
                case 'fees':
                    return parseInt(a.fees.match(/\d+/)[0]) - parseInt(b.fees.match(/\d+/)[0]);
                default:
                    return 0;
            }
        });
        
        this.displayDoctors(filteredDoctors);
    }

    displayDoctors(doctors) {
        const container = document.getElementById('doctorsList');
        
        if (doctors.length === 0) {
            container.innerHTML = '<p class="no-results">No doctors found matching your criteria.</p>';
            return;
        }
        
        container.innerHTML = doctors.map(doctor => `
            <div class="doctor-card">
                <div class="doctor-header">
                    <div class="doctor-avatar">${this.getInitials(doctor.name)}</div>
                    <div class="doctor-info">
                        <h3>${doctor.name}</h3>
                        <p class="doctor-specialization">${doctor.specialization}</p>
                    </div>
                </div>
                
                <div class="doctor-details">
                    <div class="doctor-detail">
                        <span>ðŸ“</span> ${doctor.location} (${doctor.distance})
                    </div>
                    <div class="doctor-detail">
                        <span>â­</span> 
                        <div class="doctor-rating">
                            <span class="stars">${'â˜…'.repeat(Math.floor(doctor.rating))}${'â˜†'.repeat(5 - Math.floor(doctor.rating))}</span>
                            ${doctor.rating} (${doctor.reviews} reviews)
                        </div>
                    </div>
                    <div class="doctor-detail">
                        <span>ðŸ’¼</span> ${doctor.experience} experience
                    </div>
                    <div class="doctor-detail">
                        <span>ðŸ’°</span> ${doctor.fees}
                    </div>
                    <div class="doctor-detail">
                        <span>ðŸ—£ï¸</span> ${doctor.languages.join(', ')}
                    </div>
                </div>
                
                <p>${doctor.about}</p>
                
                <div class="doctor-actions">
                    <button class="btn btn--primary" onclick="app.bookAppointmentWithDoctor(${doctor.id})">Book Appointment</button>
                    <button class="btn btn--outline" onclick="app.viewDoctorProfile(${doctor.id})">View Profile</button>
                </div>
            </div>
        `).join('');
    }

    bookAppointmentWithDoctor(doctorId) {
        const doctor = this.doctorsData.find(d => d.id === doctorId);
        if (!doctor) return;
        
        const appointment = {
            id: Date.now(),
            doctorId: doctor.id,
            doctorName: doctor.name,
            specialization: doctor.specialization,
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
            time: '10:00 AM',
            status: 'scheduled',
            type: 'consultation',
            createdAt: new Date().toISOString()
        };
        
        if (!this.currentUser.appointments) {
            this.currentUser.appointments = [];
        }
        
        this.currentUser.appointments.push(appointment);
        this.updateUserData();
        
        this.showNotification(`Appointment booked with ${doctor.name}!`, 'success');
        this.showSection('appointments');
        document.querySelector('[data-section="appointments"]').classList.add('active');
        this.loadAppointments();
    }

    viewDoctorProfile(doctorId) {
        const doctor = this.doctorsData.find(d => d.id === doctorId);
        if (!doctor) return;
        
        // This would typically open a detailed profile modal
        this.showNotification(`Viewing profile for ${doctor.name}`, 'info');
    }

    // Appointment Methods
    loadAppointments() {
        const appointments = this.currentUser.appointments || [];
        const upcomingAppointments = appointments.filter(apt => new Date(apt.date) >= new Date());
        
        this.displayAppointments(upcomingAppointments);
    }

    displayAppointments(appointments) {
        const container = document.getElementById('appointmentsList');
        
        if (appointments.length === 0) {
            container.innerHTML = '<p class="no-appointments">No appointments scheduled.</p>';
            return;
        }
        
        container.innerHTML = appointments.map(appointment => `
            <div class="appointment-item">
                <div class="appointment-info">
                    <h4>${appointment.doctorName}</h4>
                    <p>${appointment.specialization}</p>
                    <p>${this.formatDate(appointment.date)} at ${appointment.time}</p>
                </div>
                <div class="appointment-status appointment-status--${appointment.status}">
                    ${appointment.status}
                </div>
                <div class="appointment-actions">
                    <button class="btn btn--sm btn--outline" onclick="app.rescheduleAppointment(${appointment.id})">Reschedule</button>
                    <button class="btn btn--sm btn--danger" onclick="app.cancelAppointment(${appointment.id})">Cancel</button>
                </div>
            </div>
        `).join('');
    }

    bookAppointment() {
        this.showNotification('Appointment booking feature coming soon!', 'info');
    }

    rescheduleAppointment(appointmentId) {
        this.showNotification('Reschedule feature coming soon!', 'info');
    }

    cancelAppointment(appointmentId) {
        if (confirm('Are you sure you want to cancel this appointment?')) {
            const appointmentIndex = this.currentUser.appointments.findIndex(apt => apt.id === appointmentId);
            if (appointmentIndex > -1) {
                this.currentUser.appointments[appointmentIndex].status = 'cancelled';
                this.updateUserData();
                this.loadAppointments();
                this.showNotification('Appointment cancelled', 'success');
            }
        }
    }

    // Profile Methods
    loadUserProfile() {
        const profile = this.currentUser.profile || {};
        
        document.getElementById('firstName').value = profile.firstName || '';
        document.getElementById('lastName').value = profile.lastName || '';
        document.getElementById('email').value = this.currentUser.email || '';
        document.getElementById('phone').value = profile.phone || '';
        document.getElementById('dateOfBirth').value = profile.dateOfBirth || '';
        document.getElementById('allergies').value = profile.allergies || '';
        document.getElementById('medications').value = profile.medications || '';
        document.getElementById('medicalHistory').value = profile.medicalHistory || '';
        document.getElementById('emergencyContact').value = profile.emergencyContact || '';
        
        const settings = this.currentUser.settings || {};
        document.getElementById('dataSharing').checked = settings.dataSharing || false;
        document.getElementById('emailNotifications').checked = settings.emailNotifications !== false;
        document.getElementById('smsNotifications').checked = settings.smsNotifications || false;
    }

    updateProfile(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        this.currentUser.profile = {
            ...this.currentUser.profile,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phone: formData.get('phone'),
            dateOfBirth: formData.get('dateOfBirth')
        };
        
        this.currentUser.name = `${formData.get('firstName')} ${formData.get('lastName')}`.trim();
        
        this.updateUserData();
        this.updateUIForLoggedInUser();
        this.showNotification('Profile updated successfully!', 'success');
    }

    updateMedicalInfo(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        this.currentUser.profile = {
            ...this.currentUser.profile,
            allergies: formData.get('allergies'),
            medications: formData.get('medications'),
            medicalHistory: formData.get('medicalHistory'),
            emergencyContact: formData.get('emergencyContact')
        };
        
        this.updateUserData();
        this.showNotification('Medical information updated successfully!', 'success');
    }

    deleteAccount() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            if (confirm('This will permanently delete all your data. Continue?')) {
                const users = JSON.parse(localStorage.getItem('mindcare_users') || '[]');
                const updatedUsers = users.filter(user => user.id !== this.currentUser.id);
                localStorage.setItem('mindcare_users', JSON.stringify(updatedUsers));
                
                this.handleLogout();
                this.showNotification('Account deleted successfully', 'success');
            }
        }
    }

    // Tab Methods
    switchTab(e) {
        const tabName = e.target.getAttribute('data-tab');
        const tabGroup = e.target.closest('.appointments-tabs, .profile-tabs');
        const contentContainer = tabGroup.nextElementSibling;
        
        // Update tab buttons
        tabGroup.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update tab content
        contentContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        contentContainer.querySelector(`#${tabName}Tab`).classList.add('active');
    }

    // Utility Methods
    updateUserData() {
        localStorage.setItem('mindcare_current_user', JSON.stringify(this.currentUser));
        
        const users = JSON.parse(localStorage.getItem('mindcare_users') || '[]');
        const userIndex = users.findIndex(user => user.id === this.currentUser.id);
        if (userIndex > -1) {
            users[userIndex] = this.currentUser;
            localStorage.setItem('mindcare_users', JSON.stringify(users));
        }
    }

    formatDate(dateString, shortFormat = false) {
        const date = new Date(dateString);
        if (shortFormat) {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        // Set background color based on type
        const colors = {
            success: '#22c55e',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#0ea5e9'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the application
const app = new MindCareApp();