<template>
  <div class="error-checkmark">
    <div class="sweet-icon sweet-error animate-error-icon ml-n1">
      <span class="x-mark animate-x-mark">
        <span class="line left"></span>
        <span class="line right"></span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorIcon'
}
</script>

<style lang="scss" scoped>
.error-checkmark {
  width: 80px;
  height: 100px;
  margin: 0 auto;

  .sweet-icon {
    $red:    #e03d3d;

    width: 80px;
    height: 80px;
    border: 4px solid #808080;
    border-radius: 50%;
    padding: 0;
    position: relative;
    box-sizing: content-box;
    cursor: default;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &.sweet-error {
      border-color: $red;

      .x-mark {
        position: relative;
        display: block;
      }

      .line {
        position: absolute;
        height: 5px;
        width: 47px;
        background-color: $red;
        display: block;
        top: 37px;
        border-radius: 2px;

        &.left {
          transform: rotate(45deg);
          left: 17px;
        }

        &.right {
          transform: rotate(-45deg);
          right: 16px;
        }
      }
    }
  }
}

// Animations
@mixin keyframes($animation-name) {
  @keyframes #{$animation-name} {
    @content;
  }
}

@mixin animation($str) {
  animation: #{$str};
}

// Error icon animation
@include keyframes(animate-error-icon) {
  0% {
    transform: rotateX(100deg);
    opacity: 0;
  }

  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}

.animate-error-icon {
  @include animation('animate-error-icon 0.5s');
}

@include keyframes(animate-x-mark) {
  0% {
    transform: scale(.4);
    margin-top: 26px;
    opacity: 0;
  }

  50% {
    transform: scale(.4);
    margin-top: 26px;
    opacity: 0;
  }

  80% {
    transform: scale(1.15);
    margin-top: -6px;
  }

  100% {
    transform: scale(1);
    margin-top: 0;
    opacity: 1;
  }
}

.animate-x-mark {
  @include animation('animate-x-mark 0.5s');
}
</style>
