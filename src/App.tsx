import clsx from 'clsx';
import { useState, CSSProperties } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import { Article } from '../src/components/article';
import { ArticleParamsForm } from '../src/components/article-params-form';

import styles from './App.module.scss';

export const App = () => {
	const [articleStyle, setArticleStyle] = useState(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyle.fontFamilyOption.value,
					'--font-size': articleStyle.fontSizeOption.value,
					'--font-color': articleStyle.fontColor.value,
					'--container-width': articleStyle.contentWidth.value,
					'--bg-color': articleStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={setArticleStyle} />
			<Article />
		</div>
	);
};
