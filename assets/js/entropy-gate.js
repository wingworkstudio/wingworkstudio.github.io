(function () {
  'use strict';

  var slider = document.getElementById('slider');
  if (!slider) return;

  var thumb = document.getElementById('sliderThumb');
  var text = document.getElementById('sliderText');
  var track = slider.querySelector('.slider__track');

  var dragging = false;
  var startX = 0;
  var thumbLeft = 0;
  var maxDistance = 0;

  function calcMaxDistance() {
    return track.offsetWidth - thumb.offsetWidth;
  }

  thumb.addEventListener('mousedown', function (e) {
    dragging = true;
    startX = e.clientX;
    thumbLeft = thumb.offsetLeft;
    maxDistance = calcMaxDistance();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    e.preventDefault();
  });

  thumb.addEventListener('touchstart', function (e) {
    dragging = true;
    startX = e.touches[0].clientX;
    thumbLeft = thumb.offsetLeft;
    maxDistance = calcMaxDistance();
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
  }, { passive: false });

  function onMouseMove(e) {
    if (!dragging) return;
    moveThumb(e.clientX);
  }

  function onTouchMove(e) {
    if (!dragging) return;
    moveThumb(e.touches[0].clientX);
    e.preventDefault();
  }

  function moveThumb(clientX) {
    var diff = clientX - startX;
    var newLeft = thumbLeft + diff;

    if (newLeft < 0) newLeft = 0;
    if (newLeft > maxDistance) newLeft = maxDistance;

    thumb.style.left = newLeft + 'px';

    if (newLeft >= maxDistance - 2) {
      unlock();
    }
  }

  function onMouseUp() {
    dragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    resetThumb();
  }

  function onTouchEnd() {
    dragging = false;
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    resetThumb();
  }

  function resetThumb() {
    thumb.style.left = '0px';
    thumb.setAttribute('aria-valuenow', '0');
  }

  function unlock() {
    dragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);

    sessionStorage.setItem('wing_verified', '1');

    if (text) text.textContent = '✅ 验证通过，正在进入...';

    setTimeout(function () {
      window.location.href = 'indexs.html';
    }, 600);
  }

})();