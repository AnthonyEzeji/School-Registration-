import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useNavigate } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import MenuIcon from '@mui/icons-material/Menu';


export default function DrawerMenu() {
  const [state, setState] = React.useState({
    
    left: false,
   
    
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'Admin Panel' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
       <Divider> <h5>Admin Panel</h5></Divider>
      <List>
        {['All Users', 'Schedule', 'Student Holds', 'All Courses'].map((text, index) => (
          <ListItem button key={text} onClick={handleClick}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> :<InboxIcon/>}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <Divider> <h5>Student Records</h5></Divider>
      <List>
        {['Search Student','View Degree Audit', 'Enroll Student'].map((text, index) => (
          <ListItem button key={text} onClick={handleClick}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider> <h5>Faculty</h5></Divider>
      <List>
        {['Search Faculty'].map((text, index) => (
          <ListItem button key={text} onClick={handleClick}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider> <h5>Account</h5></Divider>
      <List>
        {['Profile'].map((text, index) => (
          <ListItem button key={text} onClick={handleClick}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <List>
        {['Logout'].map((text, index) => (
          <ListItem button key={text} onClick={handleClick}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
            
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const navigate = useNavigate()
  function handleClick(e){
    const text = e.target.innerHTML
    console.log(text)
    switch(text){
      case "All Users":
        navigate('/users')
        break
        case "View Degree Audit":
        navigate('/degree-audit')
        break
        case "All Courses":
          navigate('/courses')
          break
          case "Enroll Student":
          navigate(`/enroll-student/${JSON.parse(window.sessionStorage.getItem('current-student')).UserID}`)
          break
      case "Schedule":
        navigate('/master-schedule')
        break
      case 'Student Holds':
        navigate('/holds')
        break
      case 'Search Student':
        navigate('/search-student')
        break
      case 'Search Faculty':
        navigate('/faculty')
        break
      case 'Logout':
        window.sessionStorage.setItem('session', null)
        navigate('/login')
        break
      case 'Profile':
        navigate('/profile')
        break

    }

  }

  return (
    <div>
      {[<MenuIcon/>].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button id = 'menu-btn' onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor='left'
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            className = 'drawer'
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
