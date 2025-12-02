// MusicWorldPlayer.js
class MusicWorldPlayer {
    constructor() {
        this.audio = new Audio();
        this.isPlaying = false;
        this.currentTrackIndex = 0;
        this.tracks = [];
        this.currentTrack = null;
        
        this.initializePlayer();
        this.setupEventListeners();
    }
    
    initializePlayer() {
        this.playerElement = document.getElementById('musicPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressBar = document.getElementById('progressBar');
        this.progressContainer = document.querySelector('.progress-bar-container');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.currentTrackTitle = document.getElementById('currentTrackTitle');
        this.currentTrackArtist = document.getElementById('currentTrackArtist');
        this.closeBtn = document.getElementById('closePlayer');
        
        // Устанавливаем начальную громкость
        this.audio.volume = 0.5;
    }
    
    setupEventListeners() {
        // Кнопки управления
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.previousTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        this.closeBtn.addEventListener('click', () => this.hidePlayer());
        
        // Прогресс трека
        this.progressContainer.addEventListener('click', (e) => this.setProgress(e));
        
        // Громкость
        this.volumeSlider.addEventListener('input', () => this.setVolume());
        
        // События аудио
        this.audio.addEventListener('loadedmetadata', () => this.setupAudio());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextTrack());
        
        // Клик вне плеера для закрытия
        document.addEventListener('click', (e) => {
            if (!this.playerElement.contains(e.target) && 
                !e.target.closest('.track-item') && 
                !e.target.closest('.news-item') && 
                !e.target.closest('.song-item')) {
                this.hidePlayer();
            }
        });
    }
    
    // Загрузка треков для главной страницы
    loadMainPageTracks() {
        this.tracks = [
            {
                title: "Sorrow",
                artist: "plenka",
                src: "audio/plenka_-_Sorrow_79909847.mp3",
                duration: "3:45"
            },
            {
                title: "Ромашковое поле",
                artist: "найтивыход",
                src: "audio/Найтивыход - Ромашковое поле.mp3",
                duration: "4:12"
            },
            {
                title: "I'm so scared of night",
                artist: "sputnik",
                src: "audio/sputn1k_-_Im_so_scared_of_the_night_79833010.mp3",
                duration: "3:28"
            },
            {
                title: "Одинокими",
                artist: "Андрей Катиков, ЛСП",
                src: "audio/Andrejj_Katikov_LSP_-_Odinokimi_79953035.mp3",
                duration: "3:55"
            },
            {
                title: "Планета Земля",
                artist: "Noize MC",
                src: "audio/Noize MC - Planeta Zemlia (Lifehock.net).mp3",
                duration: "4:30"
            },
            {
                title: "Дырки в штанах",
                artist: "madk1d",
                src: "audio/madk1d_-_dyrki_v_shtanakh_79760669.mp3",
                duration: "3:15"
            },
            {
                title: "Пластырь",
                artist: "N.MASTEROFF, mzlff",
                src: "audio/NMASTEROFF_mzlff_-_plastyr_79821406.mp3",
                duration: "3:42"
            },
            {
                title: "Бессолнечный рассвет",
                artist: "ДЖЕЙЛО",
                src: "audio/ДЖЕЙЛО - Бессолнечный рассвет.mp3",
                duration: "4:05"
            }
        ];
        
        this.addPlayButtonsToNews();
    }
    
    // Загрузка треков для страниц исполнителей
    loadArtistTracks(artistName) {
        const tracksDatabase = {
            'Eminem': [
                {
                    title: "Lose Yourself",
                    artist: "Eminem",
                    src: "audio/eminem-lose-yourself.mp3",
                    duration: "5:26"
                },
                {
                    title: "Without Me",
                    artist: "Eminem",
                    src: "audio/eminem-without-me.mp3",
                    duration: "4:50"
                },
                {
                    title: "The Real Slim Shady",
                    artist: "Eminem",
                    src: "audio/eminem-slim-shady.mp3",
                    duration: "4:44"
                },
                {
                    title: "Stan",
                    artist: "Eminem",
                    src: "audio/eminem-stan.mp3",
                    duration: "6:44"
                },
                {
                    title: "Love The Way You Lie",
                    artist: "Eminem ft. Rihanna",
                    src: "audio/eminem-love-the-way-you-lie.mp3",
                    duration: "4:23"
                },
                {
                    title: "Not Afraid",
                    artist: "Eminem",
                    src: "audio/eminem-not-afraid.mp3",
                    duration: "4:10"
                },
                {
                    title: "Rap God",
                    artist: "Eminem",
                    src: "audio/eminem-rap-god.mp3",
                    duration: "6:03"
                },
                {
                    title: "Mockingbird",
                    artist: "Eminem",
                    src: "audio/eminem-mockingbird.mp3",
                    duration: "4:11"
                }
            ],
            'Michael Jackson': [
                {
                    title: "Billie Jean",
                    artist: "Michael Jackson",
                    src: "audio/mj-billie-jean.mp3",
                    duration: "4:54"
                },
                {
                    title: "Beat It",
                    artist: "Michael Jackson",
                    src: "audio/mj-beat-it.mp3",
                    duration: "4:18"
                },
                {
                    title: "Thriller",
                    artist: "Michael Jackson",
                    src: "audio/mj-thriller.mp3",
                    duration: "5:57"
                },
                {
                    title: "Smooth Criminal",
                    artist: "Michael Jackson",
                    src: "audio/mj-smooth-criminal.mp3",
                    duration: "4:17"
                },
                {
                    title: "Black or White",
                    artist: "Michael Jackson",
                    src: "audio/mj-black-or-white.mp3",
                    duration: "4:16"
                },
                {
                    title: "They Don't Care About Us",
                    artist: "Michael Jackson",
                    src: "audio/mj-they-dont-care.mp3",
                    duration: "4:44"
                },
                {
                    title: "Man in the Mirror",
                    artist: "Michael Jackson",
                    src: "audio/mj-man-in-the-mirror.mp3",
                    duration: "5:20"
                },
                {
                    title: "The Way You Make Me Feel",
                    artist: "Michael Jackson",
                    src: "audio/mj-the-way-you-make-me-feel.mp3",
                    duration: "4:58"
                }
            ],
            'Queen': [
                {
                    title: "Bohemian Rhapsody",
                    artist: "Queen",
                    src: "audio/queen-bohemian-rhapsody.mp3",
                    duration: "5:55"
                },
                {
                    title: "We Will Rock You",
                    artist: "Queen",
                    src: "audio/queen-we-will-rock-you.mp3",
                    duration: "2:01"
                },
                {
                    title: "We Are the Champions",
                    artist: "Queen",
                    src: "audio/queen-we-are-the-champions.mp3",
                    duration: "3:00"
                },
                {
                    title: "Another One Bites the Dust",
                    artist: "Queen",
                    src: "audio/queen-another-one-bites.mp3",
                    duration: "3:36"
                },
                {
                    title: "Don't Stop Me Now",
                    artist: "Queen",
                    src: "audio/queen-dont-stop-me-now.mp3",
                    duration: "3:29"
                },
                {
                    title: "Radio Ga Ga",
                    artist: "Queen",
                    src: "audio/queen-radio-ga-ga.mp3",
                    duration: "5:49"
                },
                {
                    title: "Somebody to Love",
                    artist: "Queen",
                    src: "audio/queen-somebody-to-love.mp3",
                    duration: "4:56"
                },
                {
                    title: "I Want to Break Free",
                    artist: "Queen",
                    src: "audio/queen-i-want-to-break-free.mp3",
                    duration: "4:18"
                }
            ]
        };
        
        this.tracks = tracksDatabase[artistName] || [];
        this.addPlayButtonsToSongs();
    }
    
    // Добавление кнопок воспроизведения к новинкам
    addPlayButtonsToNews() {
        const newsItems = document.querySelectorAll('.news-item');
        newsItems.forEach((item, index) => {
            // Добавляем иконку воспроизведения
            const playIcon = document.createElement('span');
            playIcon.className = 'play-icon';
            playIcon.style.cssText = 'margin-right: 8px; font-size: 0.8em;';
            
            item.style.cssText = 'display: flex; align-items: center; cursor: pointer; padding: 8px; border-radius: 6px;';
            item.insertBefore(playIcon, item.firstChild);
            
            // Обработчик клика
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.playTrack(index);
            });
        });
    }
    
    // Добавление кнопок воспроизведения к песням исполнителей
    addPlayButtonsToSongs() {
        const songItems = document.querySelectorAll('.song-item');
        songItems.forEach((item, index) => {
            // Добавляем иконку воспроизведения
            const playIcon = document.createElement('span');
            playIcon.className = 'play-icon';
            playIcon.style.cssText = 'margin-right: 10px; font-size: 0.9em;';
            
            item.style.cssText = 'display: flex; align-items: center; cursor: pointer;';
            const songNumber = item.querySelector('.song-number');
            if (songNumber) {
                item.insertBefore(playIcon, songNumber.nextSibling);
            } else {
                item.insertBefore(playIcon, item.firstChild);
            }
            
            // Обработчик клика
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.playTrack(index);
            });
        });
    }
    
    // Воспроизведение трека
    playTrack(index) {
        if (index >= 0 && index < this.tracks.length) {
            this.currentTrackIndex = index;
            this.currentTrack = this.tracks[index];
            
            this.showPlayer();
            this.updateTrackInfo();
            this.highlightCurrentTrack();
            
            this.audio.src = this.currentTrack.src;
            this.play();
        }
    }
    
    // Обновление информации о треке
    updateTrackInfo() {
        this.currentTrackTitle.textContent = this.currentTrack.title;
        this.currentTrackArtist.textContent = this.currentTrack.artist;
        this.durationEl.textContent = this.currentTrack.duration;
    }
    
    // Воспроизведение/пауза
    play() {
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.playBtn.innerHTML = '⏸️';
        }).catch(error => {
            console.error('Ошибка воспроизведения:', error);
            // Здесь можно добавить уведомление для пользователя
        });
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.playBtn.innerHTML = '▶️';
    }
    
    togglePlay() {
        if (!this.currentTrack) return;
        
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    // Следующий трек
    nextTrack() {
        if (this.tracks.length === 0) return;
        
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.playTrack(this.currentTrackIndex);
    }
    
    // Предыдущий трек
    previousTrack() {
        if (this.tracks.length === 0) return;
        
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
        this.playTrack(this.currentTrackIndex);
    }
    
    // Настройка аудио
    setupAudio() {
        this.durationEl.textContent = this.formatTime(this.audio.duration);
    }
    
    // Обновление прогресса
    updateProgress() {
        if (this.audio.duration) {
            const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressBar.style.width = `${progressPercent}%`;
            this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        }
    }
    
    // Установка прогресса
    setProgress(e) {
        if (!this.audio.duration) return;
        
        const width = this.progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        
        this.audio.currentTime = (clickX / width) * duration;
    }
    
    // Установка громкости
    setVolume() {
        const volume = this.volumeSlider.value / 100;
        this.audio.volume = volume;
    }
    
    // Форматирование времени
    formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Подсветка текущего трека
    highlightCurrentTrack() {
        // Убираем подсветку со всех элементов
        document.querySelectorAll('.track-item.playing, .news-item.playing, .song-item.playing')
            .forEach(item => item.classList.remove('playing'));
        
        // Подсвечиваем текущий трек
        const currentElement = document.querySelectorAll('.news-item, .song-item')[this.currentTrackIndex];
        if (currentElement) {
            currentElement.classList.add('playing');
        }
    }
    
    // Показать плеер
    showPlayer() {
        this.playerElement.classList.add('active');
    }
    
    // Скрыть плеер
    hidePlayer() {
        this.playerElement.classList.remove('active');
        this.pause();
    }
}

// Глобальная переменная для плеера
let musicPlayer;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    musicPlayer = new MusicWorldPlayer();
    
    // Определяем тип страницы и загружаем соответствующие треки
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('MusicWorld.html') || currentPage === '/') {
        // Главная страница
        musicPlayer.loadMainPageTracks();
    } else if (currentPage.includes('Eminem.html')) {
        musicPlayer.loadArtistTracks('Eminem');
    } else if (currentPage.includes('MichaelJackson.html')) {
        musicPlayer.loadArtistTracks('Michael Jackson');
    } else if (currentPage.includes('Queen.html')) {
        musicPlayer.loadArtistTracks('Queen');
    }
});