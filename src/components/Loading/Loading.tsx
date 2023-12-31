import styles from './Loading.module.css'
import loadingIcon from "react-useanimations/lib/loading";
import UseAnimations from "react-useanimations";

type Props = {signout: boolean}
const Loading = ({signout}: Props) => {

  return (
    <div className={signout ? styles.outBody : styles.body}>
          <UseAnimations
        animation={loadingIcon}
        size={50}/>
    </div>
  )
}

export default Loading
