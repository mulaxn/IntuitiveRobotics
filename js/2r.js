
    // === Canvas Setup ===
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // === Input Elements ===
    const theta1Input = document.getElementById('theta1Input');
    const theta2Input = document.getElementById('theta2Input');

    // === Robot Parameters ===
    const jointRadius = 10;
    const axisLength = 40;
    const link1Length = 150;
    const link2Length = 100;

    // === Initial State ===
    let base = { x: 300, y: 300 };
    let theta1 = 0;
    let theta2 = 0;
    let draggingPart = null;

    // === Utility Functions ===

    // Calculate joint positions based on base and angles
    function getJointPositions() {
      const joint1 = {
        x: base.x + link1Length * Math.cos(theta1),
        y: base.y + link1Length * Math.sin(theta1)
      };
      const joint2 = {
        x: joint1.x + link2Length * Math.cos(theta1 + theta2),
        y: joint1.y + link2Length * Math.sin(theta1 + theta2)
      };
      return { joint1, joint2 };
    }

    // Draw angle label at a joint
    function drawAngleLabel(x, y, label) {
      ctx.font = "14px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(label, x + 10, y - 10);
    }

    // Draw X and Y axes for a given joint
    function drawAxes(x, y, angle, labelPrefix = '') {
      const xAxis = {
        x: x + axisLength * Math.cos(angle),
        y: y + axisLength * Math.sin(angle) 
      };
      const yAxis = {
        x: x - axisLength * Math.sin(angle + Math.PI),
        y: y + axisLength * Math.cos(angle + Math.PI)
      };

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(xAxis.x, xAxis.y);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(yAxis.x, yAxis.y);
      ctx.strokeStyle = "gray";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = "12px Arial";
      ctx.fillStyle = "red";
      ctx.fillText(`${labelPrefix}X`, xAxis.x + 5, xAxis.y + 5);
      ctx.fillStyle = "gray";
      ctx.fillText(`${labelPrefix}Y`, yAxis.x + 5, yAxis.y + 5);
    }

    // Draw the robot arm with all visual elements
    function drawArm() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { joint1, joint2 } = getJointPositions();

      // Draw link 1
      ctx.beginPath();
      ctx.moveTo(base.x, base.y);
      ctx.lineTo(joint1.x, joint1.y);
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 6;
      ctx.stroke();

      // Draw link 2
      ctx.beginPath();
      ctx.moveTo(joint1.x, joint1.y);
      ctx.lineTo(joint2.x, joint2.y);
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 6;
      ctx.stroke();

      // Axes and joints
      drawAxes(joint1.x, joint1.y, theta1, '1');
      drawAxes(joint2.x, joint2.y, theta1 + theta2, '2');

      // Draw joints with highlight if dragging
      ctx.beginPath();
      ctx.arc(base.x, base.y, jointRadius, 0, 2 * Math.PI);
      ctx.fillStyle = draggingPart === 'base' ? 'orange' : 'black';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(joint1.x, joint1.y, jointRadius, 0, 2 * Math.PI);
      ctx.fillStyle = draggingPart === 'joint1' ? 'orange' : 'blue';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(joint2.x, joint2.y, jointRadius, 0, 2 * Math.PI);
      ctx.fillStyle = draggingPart === 'joint2' ? 'orange' : 'green';
      ctx.fill();

      // Draw angle labels
      drawAngleLabel(base.x, base.y, `θ1: ${(theta1 * -180 / Math.PI).toFixed(1)}°`);
      drawAngleLabel(joint1.x, joint1.y, `θ2: ${(theta2 * -180 / Math.PI).toFixed(1)}°`);

      // Sync inputs with current angles
      theta1Input.value = (theta1 * -180 / Math.PI).toFixed(1);
      theta2Input.value = (theta2 * -180 / Math.PI).toFixed(1);
    }

    // === Manual Input Handler ===
    function applyThetaInputs() {
      const t1 = parseFloat(theta1Input.value);
      const t2 = parseFloat(theta2Input.value);
      if (!isNaN(t1)) theta1 = t1 * Math.PI / -180;
      if (!isNaN(t2)) theta2 = t2 * Math.PI / -180;
      drawArm();
    }

    // === Mouse Interaction ===

    // Get mouse position relative to canvas
    function getMousePos(evt) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }

    // Check if mouse is inside a joint region
    function isInside(pos, target) {
      return Math.hypot(pos.x - target.x, pos.y - target.y) < jointRadius + 5;
    }

    // Drag start
    canvas.addEventListener('mousedown', (e) => {
      const mouse = getMousePos(e);
      const { joint1, joint2 } = getJointPositions();

      if (isInside(mouse, base)) draggingPart = 'base';
      else if (isInside(mouse, joint1)) draggingPart = 'joint1';
      else if (isInside(mouse, joint2)) draggingPart = 'joint2';
    });

    // Drag move
    canvas.addEventListener('mousemove', (e) => {
      if (!draggingPart) return;
      const mouse = getMousePos(e);
      const { joint1 } = getJointPositions();

      if (draggingPart === 'base') {
        base = mouse;
      } else if (draggingPart === 'joint1') {
        theta1 = Math.atan2(mouse.y - base.y, mouse.x - base.x);
      } else if (draggingPart === 'joint2') {
        theta2 = Math.atan2(mouse.y - joint1.y, mouse.x - joint1.x) - theta1;
      }

      drawArm();
    });

    // Drag end
    canvas.addEventListener('mouseup', () => {
      draggingPart = null;
    });

    // === Initial Draw ===
    drawArm();
  