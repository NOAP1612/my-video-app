import streamlit as st
import os
from moviepy.editor import VideoFileClip, concatenate_videoclips
import speech_recognition as sr
import numpy as np
import matplotlib.pyplot as plt
from pydub import AudioSegment
import tempfile
import time

# הגדרות ראשוניות
st.set_page_config(layout="wide", page_title="עורך פודקאסטים חכם", page_icon="🎤")
st.title("🎤 פודקאסט/הרצאה לעריכת סרטונים אוטומטית")
st.subheader("העלה קובץ, בחר קטעים מעניינים וצור סרטון מותאם אישית")

# פונקציות עזר
def extract_audio(video_path):
    """חילוץ אודיו מהוידאו"""
    try:
        video = VideoFileClip(video_path)
        audio = video.audio
        audio_path = "temp_audio.wav"
        audio.write_audiofile(audio_path, logger=None)
        return audio_path
    except Exception as e:
        st.error(f"שגיאה בחילוץ אודיו: {str(e)}")
        return None

def find_highlights(audio_path, num_segments=5, energy_threshold=0.7):
    """זיהוי קטעים מעניינים לפי אנרגיית קול"""
    try:
        audio = AudioSegment.from_wav(audio_path)
        
        # חישוב אנרגיית אודיו
        energy = []
        window_size = 1000  # 1 שנייה
        for i in range(0, len(audio), window_size):
            segment = audio[i:i+window_size]
            energy.append(segment.rms)
        
        # נרמול האנרגיה
        energy = np.array(energy)
        energy_normalized = (energy - energy.min()) / (energy.max() - energy.min())
        
        # מציאת נקודות שיא מעל סף מסוים
        peaks = []
        for i in range(len(energy_normalized)):
            if energy_normalized[i] > energy_threshold:
                # וידוא שהפיק לא קרוב מדי לפיק קודם
                if not peaks or i - peaks[-1] > 30:  # לפחות 30 שניות הפרש
                    peaks.append(i)
        
        # אם לא מצאנו מספיק פיקים, נוריד את הסף
        if len(peaks) < num_segments:
            peaks = np.argsort(energy)[-num_segments:]
        
        return sorted(peaks[:num_segments])
    except Exception as e:
        st.error(f"שגיאה בזיהוי קטעים: {str(e)}")
        return []

def create_clip(video_path, start_time, duration=30):
    """יצירת קטע וידאו"""
    try:
        video = VideoFileClip(video_path)
        start = max(0, start_time - duration//2)
        end = min(start + duration, video.duration)
        
        # התאמת זמני ההתחלה והסיום
        if end - start < duration and end < video.duration:
            end = min(video.duration, start + duration)
        if end - start < duration and start > 0:
            start = max(0, end - duration)
            
        return video.subclip(start, end)
    except Exception as e:
        st.error(f"שגיאה ביצירת קטע: {str(e)}")
        return None

def save_video(clip, filename):
    """שמירת וידאו"""
    try:
        clip.write_videofile(filename, codec='libx264', audio_codec='aac', logger=None)
        return True
    except Exception as e:
        st.error(f"שגיאה בשמירת וידאו: {str(e)}")
        return False

def visualize_audio_energy(audio_path):
    """יצירת ויזואליזציה של אנרגיית האודיו"""
    try:
        audio = AudioSegment.from_wav(audio_path)
        
        # חישוב אנרגיה
        energy = []
        window_size = 1000
        for i in range(0, len(audio), window_size):
            segment = audio[i:i+window_size]
            energy.append(segment.rms)
        
        # יצירת גרף
        fig, ax = plt.subplots(figsize=(12, 4))
        time_axis = np.arange(len(energy))
        ax.plot(time_axis, energy)
        ax.set_xlabel('זמן (שניות)')
        ax.set_ylabel('עוצמת קול')
        ax.set_title('ניתוח אנרגיית אודיו')
        ax.grid(True, alpha=0.3)
        
        return fig
    except Exception as e:
        st.error(f"שגיאה ביצירת ויזואליזציה: {str(e)}")
        return None

# ממשק משתמש
col1, col2 = st.columns([2, 1])

with col1:
    uploaded_file = st.file_uploader("העלה קובץ וידאו או אודיו", type=["mp4", "avi", "mov", "mp3", "wav"])

with col2:
    st.markdown("### הגדרות")
    num_segments = st.slider("מספר קטעים לזיהוי", min_value=3, max_value=10, value=5)
    clip_duration = st.slider("אורך כל קטע (שניות)", min_value=15, max_value=60, value=30)
    energy_threshold = st.slider("רגישות זיהוי", min_value=0.5, max_value=0.9, value=0.7)

if uploaded_file:
    # יצירת מקום לקבצים זמניים
    if 'temp_dir' not in st.session_state:
        st.session_state.temp_dir = tempfile.mkdtemp()
    
    # שמירת קובץ זמני
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(uploaded_file.name)[1], dir=st.session_state.temp_dir) as tmp_file:
        tmp_file.write(uploaded_file.getvalue())
        file_path = tmp_file.name
    
    # חילוץ אודיו
    with st.spinner('🎵 מחלץ אודיו...'):
        if file_path.endswith(('.mp4', '.avi', '.mov')):
            audio_path = extract_audio(file_path)
            video_clip = VideoFileClip(file_path)
            st.success(f"אורך הוידאו: {int(video_clip.duration//60)}:{int(video_clip.duration%60):02d} דקות")
        else:
            audio_path = file_path
            video_clip = None
            audio = AudioSegment.from_file(file_path)
            st.success(f"אורך האודיו: {int(len(audio)//60000)}:{int((len(audio)%60000)//1000):02d} דקות")
    
    # הצגת ויזואליזציה
    if audio_path:
        st.subheader("📊 ניתוח אודיו")
        fig = visualize_audio_energy(audio_path)
        if fig:
            st.pyplot(fig)
    
    # זיהוי קטעים מעניינים
    with st.spinner('🔍 מחפש קטעים מעניינים...'):
        highlights = find_highlights(audio_path, num_segments, energy_threshold)
    
    if highlights:
        st.success(f"מצאנו {len(highlights)} קטעים מעניינים!")
        
        # יצירת קטעי וידאו
        clips = []
        clip_paths = []
        
        if video_clip:
            progress_bar = st.progress(0)
            status_text = st.empty()
            
            for i, peak in enumerate(highlights):
                status_text.text(f'יוצר קטע {i+1} מתוך {len(highlights)}...')
                clip = create_clip(file_path, peak, clip_duration)
                if clip:
                    clip_path = os.path.join(st.session_state.temp_dir, f"clip_{i}.mp4")
                    if save_video(clip, clip_path):
                        clips.append(clip)
                        clip_paths.append(clip_path)
                progress_bar.progress((i+1)/len(highlights))
            
            progress_bar.empty()
            status_text.empty()
        
        # הצגת הקטעים
        if clip_paths:
            st.subheader("🎬 קטעים מומלצים:")
            selected_clips = []
            
            # יצירת רשת של קטעים
            cols_per_row = 3
            for i in range(0, len(clip_paths), cols_per_row):
                cols = st.columns(cols_per_row)
                for j in range(min(cols_per_row, len(clip_paths) - i)):
                    idx = i + j
                    with cols[j]:
                        st.markdown(f"**קטע {idx+1}** (דקה {highlights[idx]//60}:{highlights[idx]%60:02d})")
                        st.video(clip_paths[idx])
                        if st.checkbox(f"כלול קטע {idx+1}", key=f"clip_{idx}", value=True):
                            selected_clips.append(idx)
            
            # יצירת סרטון חדש
            col1, col2, col3 = st.columns([1, 2, 1])
            with col2:
                if selected_clips and st.button("🎬 צור סרטון מחובר", type="primary", use_container_width=True):
                    with st.spinner('🎞️ מרכיב את הסרטון הסופי...'):
                        try:
                            # בחירת הקליפים שנבחרו
                            final_clips = [clips[i] for i in selected_clips]
                            
                            # חיבור הקליפים
                            final_video = concatenate_videoclips(final_clips, method="compose")
                            
                            # שמירת הסרטון הסופי
                            output_path = os.path.join(st.session_state.temp_dir, "final_video.mp4")
                            save_video(final_video, output_path)
                            
                            st.success("✅ הסרטון הורכב בהצלחה!")
                            st.video(output_path)
                            
                            # כפתור הורדה
                            with open(output_path, "rb") as f:
                                st.download_button(
                                    "⬇️ הורד סרטון סופי",
                                    f,
                                    file_name=f"highlights_{int(time.time())}.mp4",
                                    mime="video/mp4",
                                    use_container_width=True
                                )
                        except Exception as e:
                            st.error(f"שגיאה בהרכבת הסרטון: {str(e)}")
    else:
        st.warning("לא נמצאו קטעים מעניינים. נסה לשנות את הגדרות הרגישות.")

# הסבר על המערכת
with st.sidebar:
    st.markdown("## 🛠️ איך זה עובד?")
    st.markdown("""
    1. **העלה קובץ** - וידאו או אודיו
    2. **ניתוח אוטומטי** - המערכת מזהה קטעים עם אנרגיה גבוהה
    3. **בחירה ידנית** - צפה וסמן קטעים רצויים
    4. **יצירת סרטון** - חיבור הקטעים לסרטון אחד
    5. **הורדה** - שמור את התוצאה הסופית
    """)
    
    st.markdown("## ⚙️ טכנולוגיות בשימוש")
    st.markdown("""
    - **Streamlit** - ממשק משתמש אינטראקטיבי
    - **MoviePy** - עריכת וידאו מתקדמת
    - **PyDub** - ניתוח ועיבוד אודיו
    - **NumPy** - חישובים מתמטיים
    - **Matplotlib** - ויזואליזציות
    """)
    
    st.markdown("## 📋 מגבלות ודרישות")
    st.markdown("""
    - גודל קובץ מקסימלי: 200MB
    - פורמטים נתמכים: MP4, AVI, MOV, MP3, WAV
    - נדרש חיבור אינטרנט יציב
    - זמן עיבוד תלוי באורך הקובץ
    """)
    
    st.markdown("## 💡 טיפים לתוצאות טובות")
    st.markdown("""
    - השתמש בקבצים באיכות טובה
    - התאם את רגישות הזיהוי לסוג התוכן
    - בדוק כל קטע לפני הכללתו
    - שמור על קטעים קצרים ודינמיים
    """)

# ניקוי קבצים זמניים בסיום
if st.button("🗑️ נקה קבצים זמניים", help="לחץ לניקוי כל הקבצים הזמניים"):
    if 'temp_dir' in st.session_state and os.path.exists(st.session_state.temp_dir):
        import shutil
        shutil.rmtree(st.session_state.temp_dir)
        del st.session_state.temp_dir
        st.success("קבצים זמניים נוקו בהצלחה!")
        st.experimental_rerun()
