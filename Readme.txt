You must be countdown in your extjs views:

{
	xtype: 'countdown',
	itemId: 'countTimer',
	label: 'Tiempo:',
	timeout: 15000, //15 segundos, esta en milisegundos
	flex: 1
}

And you must import font ds-digi family in your home page or css files

@font-face 
{
  font-family: 'ds-digi';
  src: url('../../../Styles/Desktop/ds-digi-webfont.eot'); /* IE9 Compat Modes */
  src: url('../../../Styles/Desktop/ds-digi-webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../../../Styles/Desktop/ds-digi-webfont.woff') format('woff'), /* Modern Browsers */
       url('../../../Styles/Desktop/ds-digi-webfont.TTF')  format('truetype'); /* Safari, Android, iOS */
       /*url('ds-digi-webfont.svg#svgFontName') format('svg');*/ /* Legacy iOS */
}