import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import { ArrowButton } from '../../ui/arrow-button/';
import { Text } from '../../ui/text';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { Button } from '../../ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';

type Props = {
	onChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onChange }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [params, setParams] = useState(defaultArticleState);
	const containerRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		onChange: handleToggleMenu,
		rootRef: containerRef,
	});

	function handleToggleMenu() {
		setIsOpen((isOpen) => !isOpen);
	}

	function handleOptionChange(key: string, option: OptionType) {
		setParams((prev) => ({ ...prev, [key]: option })); 
	}

	function handleResetOptions() {
		const resetState = defaultArticleState;
		setParams(resetState); 
		onChange({ ...resetState }); 
	}

	function handleSubmitOptions(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		onChange({ ...params }); 
	}

	return (
		<div ref={containerRef}>
			<ArrowButton isOpen={isOpen} onClick={handleToggleMenu} />
			<aside
				className={clsx(styles.container, isOpen ? styles.container_open : '')}>
				<form
					className={styles.form}
					onSubmit={handleSubmitOptions}>
					<Text as='p' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={params.fontFamilyOption}
						onChange={(selected) => {
							handleOptionChange('fontFamilyOption', selected);
						}}></Select>
					<RadioGroup
						title='Размер Шрифта'
						options={fontSizeOptions}
						selected={params.fontSizeOption}
						onChange={(selected) => {
							handleOptionChange('fontSizeOption', selected);
						}}
						name='fontSize'
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={params.fontColor}
						onChange={(selected) => {
							handleOptionChange('fontColor', selected);
						}}></Select>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={params.backgroundColor}
						onChange={(selected) => {
							handleOptionChange('backgroundColor', selected);
						}}></Select>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={params.contentWidth}
						onChange={(selected) => {
							handleOptionChange('contentWidth', selected);
						}}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleResetOptions} /> {/* Привязка через onClick */}
						<Button title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};