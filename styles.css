// قائمة المقرئين
const reciters = [
    { name: "عبد الباسط عبد الصمد", id: "ar.abdulbasitmurattal" },
    { name: "مشاري العفاسي", id: "ar.alafasy" },
    { name: "سعد الغامدي", id: "ar.saadghamdi" },
    // يمكنك إضافة المزيد من المقرئين (حتى 10)
];

// متغيرات عالمية
let currentSurah = null;
let currentAyah = 1;
let ayahsData = [];
let timings = {};

// تعبئة قائمة السور
async function loadSurahs() {
    const response = await fetch("https://api.alquran.cloud/v1/surah");
    const data = await response.json();
    const surahSelect = document.getElementById("surahSelect");
    data.data.forEach(surah => {
        const option = document.createElement("option");
        option.value = surah.number;
        option.textContent = `${surah.number} - ${surah.name}`;
        surahSelect.appendChild(option);
    });
}

// تعبئة قائمة المقرئين
function loadReciters() {
    const reciterSelect = document.getElementById("reciterSelect");
    reciters.forEach(reciter => {
        const option = document.createElement("option");
        option.value = reciter.id;
        option.textContent = reciter.name;
        reciterSelect.appendChild(option);
    });
}

// جلب وعرض السورة
async function loadSurah() {
    const surahNumber = document.getElementById("surahSelect").value;
    if (!surahNumber) return;

    currentSurah = surahNumber;
    currentAyah = 1;

    // التحقق من التخزين المؤقت
    const cachedSurah = localStorage.getItem(`surah_${surahNumber}`);
    if (cachedSurah) {
        ayahsData = JSON.parse(cachedSurah);
        displayAyahs(ayahsData);
    } else {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.uthmani`);
        const data = await response.json();
        ayahsData = data.data.ayahs;
        localStorage.setItem(`surah_${surahNumber}`, JSON.stringify(ayahsData));
        displayAyahs(ayahsData);
    }

    // جلب توقيتات الآيات (يجب توفير ملف حقيقي لاحقًا)
    await loadTimings(surahNumber);

    // تشغيل الآية الأولى فقط عند تحميل السورة
    playAyah(1);
}

// عرض الآيات
function displayAyahs(ayahs) {
    const ayahsContainer = document.getElementById("ayahsContainer");
    ayahsContainer.innerHTML = "";
    ayahs.forEach(ayah => {
        const ayahDiv = document.createElement("div");
        ayahDiv.classList.add("ayah");
        ayahDiv.dataset.ayahNumber = ayah.numberInSurah;
        ayahDiv.textContent = ayah.text;
        ayahDiv.onclick = () => playAyah(ayah.numberInSurah);
        ayahsContainer.appendChild(ayahDiv);
    });
}

// جلب توقيتات الآيات (مثال فقط، يحتاج إلى ملف JSON حقيقي)
async function loadTimings(surahNumber) {
    try {
        const response = await fetch(`timings/surah_${surahNumber}.json`);
        timings = await response.json();
    } catch (e) {
        console.log("لم يتم العثور على ملف التوقيتات");
        timings = {};
    }
}

// تشغيل الصوت لآية معينة
function playAyah(ayahNumber) {
    const reciterId = document.getElementById("reciterSelect").value;
    if (!reciterId) return;

    currentAyah = ayahNumber;
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = `https://cdn.alquran.cloud/media/audio/ayah/${reciterId}/${currentSurah}_${ayahNumber}/high`;
    audioPlayer.play();

    // إبراز الآية الحالية
    highlightAyah(ayahNumber);
}

// إبراز الآية
function highlightAyah(ayahNumber) {
    const ayahs = document.querySelectorAll(".ayah");
    ayahs.forEach(ayah => {
        if (ayah.dataset.ayahNumber == ayahNumber) {
            ayah.classList.add("active");
        } else {
            ayah.classList.remove("active");
        }
    });
}

// تحديث الصوت عند اختيار مقرئ جديد
function updateAudio() {
    playAyah(currentAyah);
}

// تشغيل الآية التالية
document.getElementById("playNext").onclick = () => {
    if (currentAyah < ayahsData.length) {
        playAyah(currentAyah + 1);
    }
};

// إيقاف الصوت
document.getElementById("stopAudio").onclick = () => {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
};

// تهيئة الصفحة
window.onload = () => {
    loadSurahs();
    loadReciters();
};
