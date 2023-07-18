import styles from './Loading.module.css'
import loadingIcon from "react-useanimations/lib/loading";
import UseAnimations from "react-useanimations";

const Loading = () => {
  return (
    <div className={styles.body}>
          <UseAnimations
        animation={loadingIcon}
        size={50}/>
    </div>
  )
}

export default Loading
