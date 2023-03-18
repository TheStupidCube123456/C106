function startClassification()
{
  navigator.mediaDevices.getUserMedia({ audio: true});
  classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/st2AKhhFJ/model.json', modelReady);
}

function modelReady(){
  classifier.classify(gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    random_number_r = Math.floor(Math.random() * 255) + 1;
    random_number_g = Math.floor(Math.random() * 255) + 1;
    random_number_b = Math.floor(Math.random() * 255) + 1;

    document.getElementById("result_label").innerHTML = 'Posso ouvir - '+ results[0].label;
    document.getElementById("result_confidence").innerHTML = 'Precisão - '+ (results[0].confidence*100).toFixed(2)+" %";
    document.getElementById("result_label").style.color = "rgb("+random_number_r+","+random_number_g+","+random_number_r+")";
    document.getElementById("result_confidence").style.color = "rgb("+random_number_r+","+random_number_g+","+random_number_r+")";

    img = document.getElementById('dog') 
    img1 = document.getElementById('glass')
    img2 = document.getElementById('doorbell')
    img3 = document.getElementById('normal')

    if (results[0].label == "Pitbull") {
      document.getElementById("som").innerHTML = "latidos de pitbull!" 
      img.src = 'Dog-Danger.gif';
      img1.src = 'Glass-Normal.png';
      img2.src = 'Dorbell-Normal.png';
      img3.src = 'Normal.png';
    } else if (results[0].label == "Vidro Quebrando") {
      document.getElementById("som").innerHTML = "vidro quebrando!"
      img.src = 'Dog-Normal.png';
      img1.src = 'Glass-Danger.png';
      img2.src = 'Dorbell-Normal.png';
      img3.src = 'Normal.png';
    } else if (results[0].label == "Campainha") {
      document.getElementById("som").innerHTML = "uma campainha tocando!"
      img.src = 'Dog-Normal.png';
      img1.src = 'Glass-Normal.png';
      img2.src = 'Dorbell-Alert.gif';
      img3.src = 'Normal.png';
    } else{
      document.getElementById("som").innerHTML = "nada."
      img.src = 'Dog-Normal.png';
      img1.src = 'Glass-Normal.png';
      img2.src = 'Dorbell-Normal.png';
      img3.src = 'Norma-Active.png';
    }
  }
}
