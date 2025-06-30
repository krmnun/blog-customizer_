import React, { useState } from 'react'; // Добавлен импорт React
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Select } from 'src/ui/select/Select';
import { ArticleStateType,
         OptionType,
         fontFamilyOptions,
         fontColors,
         backgroundColors,
         contentWidthArr,
         fontSizeOptions, } from '../../constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

interface Props {
  initialState: ArticleStateType;
  isSidebarOpen: boolean;
  onApply: (state: ArticleStateType) => void;
  onReset: () => void;
  onToggle: () => void;
}

export const ArticleParamsForm = ({ initialState,
                                   isSidebarOpen,
                                   onApply,
                                   onReset,
                                   onToggle, }: Props) => {
  const [formState, setFormState] = useState<ArticleStateType>(initialState);

  const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
    setFormState((prev: ArticleStateType) => ({ ...prev, [key]: value })); // Типизирован prev
  };

  const handleApply = () => {
    onApply(formState);
  };

  const handleReset = () => {
    setFormState(initialState);
    onReset();
  };

  return (
    <>
      <ArrowButton isOpen={isSidebarOpen} onClick={onToggle} />
      <aside className={clsx(styles.container, {
        [styles.container_open]: isSidebarOpen,
      })}>
        <form className={styles.form}
              onSubmit={(e) => e.preventDefault()}
              onClick={(e) => e.stopPropagation()}>
          <div className={styles.formContent}>
            <h2>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>
            <div className={styles.formGroup}>
              <Select
                title='Шрифт'
                selected={formState.fontFamilyOption}
                options={fontFamilyOptions}
                onChange={(value) => handleChange('fontFamilyOption', value)}
              />
            </div>
            <div className={styles.formGroup}>
              <RadioGroup
                title='Размер шрифта'
                selected={formState.fontSizeOption}
                options={fontSizeOptions}
                onChange={(value) => handleChange('fontSizeOption', value)}
                name='fontSize'
              />
            </div>
            <div className={styles.formGroup}>
              <RadioGroup
                title='Цвет шрифта'
                selected={formState.fontColor}
                options={fontColors}
                onChange={(value) => handleChange('fontColor', value)}
                name='fontColor'
              />
            </div>
            <div className={styles.formGroup}>
              <RadioGroup
                title='Цвет фона'
                selected={formState.backgroundColor}
                options={backgroundColors}
                onChange={(value) => handleChange('backgroundColor', value)}
                name='backgroundColor'
              />
            </div>
            <div className={styles.formGroup}>
              <Select
                title='Ширина контента'
                selected={formState.contentWidth}
                options={contentWidthArr}
                onChange={(value) => handleChange('contentWidth', value)}
              />
            </div>
            <div className={styles.bottomContainer}>
              <Button title='Сбросить'
                      htmlType='button'
                      type='clear'
                      onClick={handleReset}
              />
              <Button title='Применить'
                      htmlType='button'
                      type='apply'
                      onClick={handleApply}
              />
            </div>
          </div>
        </form>
      </aside>
    </>
  );
};