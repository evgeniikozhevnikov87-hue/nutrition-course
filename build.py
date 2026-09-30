import sys,re
n=sys.argv[1]; title=sys.argv[2]
body=open(f'src/{n}.html',encoding='utf-8').read()
head=f'''<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700&family=Unbounded:wght@500;700&display=swap">
<link rel="stylesheet" href="course.css">
</head>
<body>
'''
inter='''<section id="cards">
  <h2>Карточки для повторения</h2>
  <p class="lead">Нажмите на карточку, чтобы увидеть ответ.</p>
  <div class="cards">
    <button class="card" id="card" aria-pressed="false" type="button">
      <span class="side-a"><span class="hint">Вопрос</span><br><span id="cardQ"></span></span>
      <span class="side-b"><span class="hint">Ответ</span><br><span id="cardA"></span></span>
    </button>
    <div class="cardnav">
      <button class="btn ghost" id="prevCard" type="button">← Назад</button>
      <span id="cardPos" class="src"></span>
      <button class="btn ghost" id="nextCard" type="button">Далее →</button>
    </div>
  </div>
</section>

<section id="quiz">
  <h2>Самопроверка</h2>
  <p class="lead">5 вопросов. После ответа появится объяснение.</p>
  <div id="quizBox" style="display:grid;gap:20px"></div>
  <div class="screen"><p class="score" id="score">Ответов: 0 из 5</p><button class="btn ghost" id="resetQuiz" type="button">Пройти заново</button></div>
</section>'''
body=body.replace('<!--INTERACTIVE-->',inter)
tail='\n<script src="course.js"></script>\n</body>\n</html>\n'
open(f'{n}.html','w',encoding='utf-8').write(head+body+tail)
print('ok',n)
