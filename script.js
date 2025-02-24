// قائمة المقرئين (يمكنك إضافة المزيد حسب الحاجة)
const reciters = [
    { name: "عبد الباسط عبد الصمد", id: "ar.abdulbasitmurattal" },
    { name: "مشاري العفاسي", id: "ar.alafasy" },
    { name: "سعد الغامدي", id: "ar.saadghamdi" },
    // أضف المزيد من المقرئين هنا (حتى 10)
];

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

    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.uthmani`);
    const data = await response.json();
    const ayahsContainer = document.getElementById("ayahsContainer");
    ayahsContainer.innerHTML = "";

    data.data.ayahs.forEach(ayah => {
        const ayahDiv = document.createElement("div");
        ayahDiv.classList.add("ayah");
        ayahDiv.dataset.ayahNumber = ayah.numberInSurah;
        ayahDiv.textContent = ayah.text;
        ayahsContainer.appendChild(ayahDiv);
    });

    updateAudio();
}

// تحديث الصوت
function updateAudio() {
    const surahNumber = document.getElementById("surahSelect").value;
    const reciterId = document.getElementById("reciterSelect").value;
    if (!surahNumber || !reciterId) return;

    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = `https://cdn.alquran.cloud/media/audio/ayah/${reciterId}/${surahNumber}/high`;
    audioPlayer.play();

    // التزامن (مثال بسيط)
    audioPlayer.ontimeupdate = () => {
        const currentTime = audioPlayer.currentTime;
        const ayahs = document.querySelectorAll(".ayah");
        ayahs.forEach(ayah => ayah.classList.remove("active"));
        // تحتاج إلى بيانات توقيت دقيقة من API أو ملف خارجي لتحديد الآية الحالية
    };
}

// تهيئة الصفحة
window.onload = () => {
    loadSurahs();
    loadReciters();
};