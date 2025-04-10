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
</p>`

explanation1.innerHTML = exp;