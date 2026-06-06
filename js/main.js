// JS-Приложение 1
class Plant {
    constructor(id, title, desc, tag1, tag2, img) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.tag1 = tag1;
        this.tag2 = tag2;
        this.img = img;
    }

    createCardElement() {
        const article = document.createElement('article');
        article.classList.add('plant-card');
        article.setAttribute('data-id', this.id);

        article.innerHTML = 
            '<img src="' + this.img + '" alt="' + this.title + '" class="plant-card__img">' +
            '<div class="plant-card__content">' +
                '<h3 class="plant-card__title">' + this.title + '</h3>' +
                '<p class="plant-card__desc">' + this.desc + '</p>' +
                '<div class="plant-card__tags">' +
                    '<span class="tag">' + this.tag1 + '</span>' +
                    '<span class="tag">' + this.tag2 + '</span>' +
                '</div>' +
                '<button class="plant-card__btn add-to-greenhouse-btn">В оранжерею</button>' +
            '</div>';

        return article;
    }
}

const plantsDatabase = [
    new Plant(1, "Монстера Делициоза", "Тропическая лиана с крупными резными листьями.", "Полутень", "Умеренный полив", "https://topplant.ru/assets/images/products/4603/monstera-deliciosa-27-150-2.jpg"),
    new Plant(2, "Эхеверия (Суккулент)", "Каменная роза, не требующая частого внимания.", "Яркое солнце", "Редкий полив", "https://grinoteka.ru/upload/iblock/7d9/fp9epuaseqg1rqvn416pbyj2z0089331.jpg"),
    new Plant(3, "Спатифиллум", "Популярное комнатное растение «Женское счастье».", "Рассеянный свет", "Влаголюбивое", "https://orchidea-shop.ru/base/data/5791mid.jpg"),
    new Plant(4, "Фикус Бенджамина", "Изящное деревце с тонкими ветвями и мелкими листьями.", "Яркий свет", "Умеренный полив", "https://liodoro.ru/wp-content/uploads/2023/06/fikus-bendzhamina-piramida-miks.jpg"),
    new Plant(5, "Замиокулькас", "Легендарное «долларовое дерево». Крайне выносливое.", "Любой свет", "Редкий полив", "https://static.insales-cdn.com/images/products/1/5995/829970283/IMG_0959.jpeg"),
    new Plant(6, "Фиалка (Сенполия)", "Компактное растение с бархатистыми яркими цветами.", "Рассеянный свет", "Полив через поддон", "https://www.roza4u.ru/image/cache/catalog/gorshechnye-cvety/Senpoliya_sirenevaya_1-600x600.jpg")
];


document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggleBtn.textContent = 'Светлая тема';
    } else {
        themeToggleBtn.textContent = 'Сменить тему';
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = 'Сменить тему';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = 'Светлая тема';
        }
    });

    const catalogGrid = document.getElementById('catalog-grid');
   
    if (catalogGrid) {
        plantsDatabase.forEach(plant => {
            const cardElement = plant.createCardElement();
            catalogGrid.appendChild(cardElement);
        });

        catalogGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-greenhouse-btn')) {
                const card = e.target.closest('.plant-card');
                const plantId = card.getAttribute('data-id');
                
                let greenhouse = JSON.parse(localStorage.getItem('greenhouse')) || [];
                
                if (!greenhouse.includes(plantId)) {
                    greenhouse.push(plantId);
                    localStorage.setItem('greenhouse', JSON.stringify(greenhouse));
                    alert('Растение успешно добавлено в вашу оранжерею!');
                } else {
                    alert('Это растение уже есть в вашей оранжерее!');
                }
            }
        });
    }

    const greenhouseGrid = document.getElementById('greenhouse-grid');
    const emptyMsg = document.getElementById('greenhouse-empty-msg');

    if (greenhouseGrid) {
        let greenhouse = JSON.parse(localStorage.getItem('greenhouse')) || [];

        if (greenhouse.length > 0) {
            if (emptyMsg) emptyMsg.style.display = 'none';

            greenhouse.forEach(savedId => {
                const foundPlant = plantsDatabase.find(plant => plant.id == savedId);
                
                if (foundPlant) {
                    const cardElement = foundPlant.createCardElement();
                    const btn = cardElement.querySelector('.plant-card__btn');
                    btn.textContent = 'Удалить';
                    btn.classList.remove('add-to-greenhouse-btn');
                    btn.classList.add('delete-from-greenhouse-btn');
                    
                    greenhouseGrid.appendChild(cardElement);
                }
            });
        }

        greenhouseGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-from-greenhouse-btn')) {
                const card = e.target.closest('.plant-card');
                const plantId = card.getAttribute('data-id');
                
                let greenhouse = JSON.parse(localStorage.getItem('greenhouse')) || [];
                greenhouse = greenhouse.filter(id => id != plantId);
                
                localStorage.setItem('greenhouse', JSON.stringify(greenhouse));
                card.remove();
                
                if (greenhouse.length === 0 && emptyMsg) {
                    emptyMsg.style.display = 'block';
                }
            }
        });
    }
});

// JS-Приложение 2
const calcForm = document.getElementById('plant-calc-form');
    const calcResults = document.getElementById('calc-results');

    if (calcForm && calcResults) {
        calcForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const plantName = document.getElementById('plant-name-input').value.trim();
            const plantType = document.getElementById('plant-type').value;
            const currentDiam = parseFloat(document.getElementById('current-diameter').value);

            let newDiam = currentDiam + 3;

            if (plantType === 'monstera') {
                newDiam = currentDiam + 5;
            } else if (plantType === 'orchid') {
                newDiam = currentDiam + 2;
            }

            const h = newDiam;
            const R = newDiam / 2;
            const r = R * 0.8;
            
            const totalVolumeCm3 = (1 / 3) * Math.PI * h * (R * R + R * r + r * r);
            const totalVolumeLitres = totalVolumeCm3 / 1000;

            let soilVolume = 0;
            let drainVolume = 0;

            if (plantType === 'succulent') {
                drainVolume = totalVolumeLitres * 0.35;
                soilVolume = totalVolumeLitres * 0.65;
            } else if (plantType === 'orchid') {
                drainVolume = 0;
                soilVolume = totalVolumeLitres;
            } else if (plantType === 'monstera') {
                drainVolume = totalVolumeLitres * 0.10;
                soilVolume = totalVolumeLitres * 0.90;
            } else {
                drainVolume = totalVolumeLitres * 0.15;
                soilVolume = totalVolumeLitres * 0.85;
            }

            const nameContainer = document.getElementById('res-plant-name');
            if (plantName) {
                nameContainer.textContent = 'для "' + plantName + '"';
            } else {
                nameContainer.textContent = '';
            }

            document.getElementById('res-pot').textContent = newDiam;
            document.getElementById('res-soil').textContent = soilVolume.toFixed(1);
            document.getElementById('res-drain').textContent = drainVolume.toFixed(1);

            calcResults.classList.remove('hidden');
        });
    }

//JS Приложение 3
const weatherBtn = document.getElementById('get-weather-btn');
    const weatherResults = document.getElementById('weather-results');

    if (weatherBtn && weatherResults) {
        weatherBtn.addEventListener('click', function() {
            weatherBtn.textContent = 'Расчет фазы...';
            weatherBtn.disabled = true;

            // Астрономический алгоритм расчета фазы Луны
            const now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            const day = now.getDate();

            if (month < 3) {
                year--;
                month += 12;
            }
            month++;
            
            const c = 365.25 * year;
            const e = 30.6 * month;
            let jd = c + e + day - 694039.09; 
            jd /= 29.5305882; 
            
            const b = parseInt(jd);
            jd -= b;

            const illumination = Math.round(Math.abs(jd - 0.5) * 2 * 100); 
            const age = jd * 29.53; 

              let phaseText = '';
            let tipText = '';
            let moonIcon = '';

            if (age < 1.5 || age > 28) {
                phaseText = 'Новолуние';
                moonIcon = '🌑';
                tipText = 'Период Новолуния. Самый опасный период! Любые пересадки, обрезка и подкормки строго запрещены. Растения уязвимы. Разрешен только легкий полив.';
            } else if (age >= 1.5 && age < 13.5) {
                phaseText = 'Растущая Луна';
                moonIcon = '🌙';
                tipText = 'Растущая Луна. Соки растений движутся вверх к листьям. Идеальное время для пересадки комнатных цветов, посадки новых семян и активного полива.';
            } else if (age >= 13.5 && age < 16) {
                phaseText = 'Полнолуние';
                moonIcon = '🌕';
                tipText = 'Полнолуние. Корни и листья максимально напитаны энергией, но уязвимы к повреждениям. Избегайте пересадок и обрезки. Рекомендуется поверхностное рыхление почвы.';
            } else {
                phaseText = 'Убывающая Луна';
                moonIcon = '🌘'; 
                tipText = 'Убывающая Луна. Энергия и соки уходят вниз к корням. Рекомендуется проводить обрезку сухих листьев, формовку кроны и борьбу с вредителями. С пересадкой новых цветов лучше повременить.';
            }

        
            document.getElementById('weather-temp').textContent = illumination;
            document.getElementById('weather-wind').textContent = phaseText;
            document.getElementById('moon-icon').textContent = moonIcon; 
            document.getElementById('weather-tip').textContent = tipText;

            weatherResults.classList.remove('hidden');
            weatherBtn.textContent = 'Узнать фазу Луны и советы';
            weatherBtn.disabled = false;
        });
    }
