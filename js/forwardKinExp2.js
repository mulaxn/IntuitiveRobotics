exp = 
`<p>
    <b>Revolute:</b>
    
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

    <b>Prismatic:</b>
    
    <br></br>

    Because prismatic joints don't rotate their angle doesn't change, therefore 
    they have no angular velocity. To calculate linear velocity, we treat the direction the joint is extending
    or contracting in as a unit vector. So, if the joint is moving in the z-axis
    relative to the reference frame, γ = (0,0,1). Now we must use the product of exponentials formula to calculate the position
    and orientation of the end-effector after the set of theta values is applied.

    <br></br>

    P.O.E: T(θ) = e^([S1]θ1) e^([S2]θ2) ... e^([Sn]θn) M

    <br></br>
    <pre>
    e^[Si] = [e^[ωi]θi   (I - e^[ωi]θi)γi]
             [   0              1        ]</pre>

    e^[ωi] = I + sin(θ)[ωi] + (1 - cos(θ))[ωi]^2, where [ωi] is the skew-symetric
    matrix related to ωi.

    <br></br>

    Once we complete this process for all joints we multiply all of our matrices
    together according to the formula and get our answer.
</p>`

explanation2.innerHTML = exp;
