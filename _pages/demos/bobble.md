---
title: "Bobble Demo"
permalink: /demos/bobble
layout: page
---

This is an early demo that needs more work, because the motion is more bouncy than "bobbly", and I have some page layout issues to resolve.
The point of the demo is simply to illustrate that, yes, it should be doable.

{% include justice-image.html id="afortas" body="/images/justices/afortas/afortas-body.png" head="/images/justices/afortas/afortas-head.png" name="Abe Fortas" link="/justices/all/afortas" %}

<script>
anime({
  targets: '#afortas-head',
  translateY: '5vh',
  duration: 300,
  loop: true,
  direction: 'alternate',
  easing: 'easeInCubic'
});
</script>
