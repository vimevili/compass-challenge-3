import { useState, useRef } from 'react'
import UseAnimations from "react-useanimations";
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'
import styles from './FilterButton.module.css'
import CategoryFilters from './CategoryFilters'
import SortBy from './SortBy'
import 'react-spring-bottom-sheet/dist/style.css'
import filterIcon from "react-useanimations/lib/settings2";

export default function FilterButton({ setLoading, applyFiltersAndSort, selectedCategory, setSelectedCategory, selectedSortBy, setSelectedSortBy}) {
  
  const [open, setOpen] = useState(false)
  const sheetRef = useRef<BottomSheetRef>()

  function apply() {
    applyFiltersAndSort();

    setLoading(true);
    setOpen(false);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  function clearFilters() {
    setSelectedCategory(null)
    setSelectedSortBy(null)
  }
  function onDismiss () {
    setOpen(false)
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={styles.button}>
        <div className={styles.buttonContainer}>
            <p className={styles.title}>Filter</p>
            <UseAnimations animation={filterIcon} />
        </div>
        </button>

        <BottomSheet ref={sheetRef}
        open={open}
        onDismiss={onDismiss}
        defaultSnap={({ maxHeight }) => maxHeight / 2}
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 10,
          maxHeight / 4,
          maxHeight * 0.6]}
        expandOnContentDrag={true}>

            <div className={styles.container}>
                <div className={styles.headerContainer}>
                <h1 className={styles.sheetTitle}>Filter</h1>   
                  <div className={styles.buttonsContainer}>
                    <button onClick={clearFilters} className={styles.clearButton}>Clear filters</button>
                    <button onClick={onDismiss} className={styles.exitButton}><img src="/src/assets/exit.svg" alt="" /></button>
                  </div>
                </div>
                <div>
                  <p className={styles.basicText}>Category</p>
                  <CategoryFilters 
                  selectedCategory = {selectedCategory}
                  setSelectedCategory = {setSelectedCategory}
                  clearFilters={clearFilters}
                  />
                </div>
                <div>
                  <p className={styles.basicText}>Sort By</p>
                  <SortBy 
                  selectedSortBy={selectedSortBy}
                  setSelectedSortBy={setSelectedSortBy}
                  clearFilters={clearFilters}
                  />
                </div>
                <button onClick={apply} className={styles.applyButton}>Apply Filter</button>
            </div>
        </BottomSheet>


    </>
  )
}