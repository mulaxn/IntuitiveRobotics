exp = 
`<p>
    Forward Kinematics is the process of figuring out what the postion
    and orientation of the end-effector will become after a set of thetas
    is applied to the robot relative to some fixed frame.

    <br></br>

    Given a robot, and some known parameters related to its joints,
    after applying a set of theta values to those joints, you can figure
    out the end-effector's position and orientation.
    
    <br></br>

    <b>Step 1)</b>

    <br></br>

    Identify the current position and orientation of the end-effector.
    This will produce a homogeneous matrix. We will call this matrix M.
    
    <br></br>

    <b>Step 2)</b>

    <br></br>

    Calculate the screw axis for all joints. To do this we need to find
    ω (angular velocity) and γ (linear velocity). The way we do this will 
    differ based on whether we are working with revolute or prismatic joints.
    
    <br></br>

    Revolute: 
    
    <br></br>

    To calculate the angular velocity we simply find which axis the joint
    is rotating in relative to the reference frame and treat it as a unit vector.
    So if the join is rotating in the x-axis relative to the reference frame,
    the angular velocity will be (1,0,0).

    <br></br>

    To calculate linear velocity, first we choose any point, q, on the axis of rotation.
    Then we will take the cross product between -ω and q. This will result in the 
    linear velocity. Ex, ω = (1,0,0) and q = (0,0,0) -> -ω x q = (0,0,0).

    <br></br>

    Prismatic: 
    
    <br></br>

    Because prismatic joints don't rotate their angle doesn't change, therefore 
    they have no angular velocity.

    <br></br>

    To calculate linear velocity, we treat the direction the joint is extending
    or contracting in as a unit vector. So, if the joint is moving in the z-axis
    relative to the reference frame, γ = (0,0,1).

    <br></br>

    Now we must use the product of exponentials formula to calculate the position
    and orientation of the end-effector after the set of theta values is applied.

    <br></br>

    P.O.E: T(θ) = e^([S1]θ1) e^([S2]θ2) ... e^([Sn]θn) M

    <br></br>

    To get e^[Si] we first need: <br></br><pre>
    [e^[ωi]θi   (I - e^[ωi]θi)γi]
    [   0              1        ]</pre>

    e^[ωi] = I + sin(θ)[ωi] + (1 - cos(θ))[ωi]^2, where [ωi] is the skew-symetric
    matrix related to ωi.

    <br></br>
    
    Once we complete this process for all joints we multiply all of our matrices
    together according to the formula and get our answer.
</p>`

explaination.innerHTML = exp;