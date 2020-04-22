# Project
React-Native & Expo를 이용한 세 번째 프로젝트이다.  
Nomad coder의 "React Native로 ToDo 앱 만들기"를 참고하며 만들었다.  
두 번째 프로젝트인 Weather App에서는 API를 이용하여 날씨를 알려주는 간단한 앱을 만들었다면  
이번 프로젝트에서는 사용자의 입력에 따라 ToDO를 만들고(**CREATE**) ToDO를 변경할 수도 있게 하였으며 (**UPDATE**)  
ToDo를 삭제(**DELETE**)하는 기능들을 구현하였다.  
또한 완료한 ToDo는 완료 표시를 할 수 있도록 하여 사용자의 편의를 생각하였고  
create, update, delete 등의 변화(**CHANGE**)를 줄 때마다 ToDo를 Disk에 저장하여  
앱을 종료하고 다시 실행하였을 때 ToDo를 불러올 수 있도록 하였다.
# Learned
Weather App에서는 배우지 못했던 AsycStorage라는 Disk에 String을 map 형식으로 저장하는 method, 
state, props를 이용한 value 전달, **기존 Object Array에 new Obect를 추가하는 방식**,  
fuction을 정의하고 props를 통한 function 전달 등의 다양한 개념과 응용을 배울 수 있었다.  
특히 ToDo List에 (...)를 통해 Object를 Insert하는 방식으로  
간단하게 ToDo List를 생성하는 점이 신기하였다.
