import React, { useState } from 'react'
import style from './Input-Message.module.css'
const fish = 'Кстати, сделанные на базе интернет-аналитики выводы лишь добавляют фракционных разногласий и объединены в целые кластеры себе подобных. А ещё действия представителей оппозиции представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть подвергнуты целой серии независимых исследований. В частности, базовый вектор развития способствует подготовке и реализации как самодостаточных, так и внешне зависимых концептуальных решений. Есть над чем задуматься: диаграммы связей формируют глобальную экономическую сеть и при этом — описаны максимально подробно. Имеется спорная точка зрения, гласящая примерно следующее: действия представителей оппозиции будут объективно рассмотрены соответствующими инстанциями. Как уже неоднократно упомянуто, тщательные исследования конкурентов и по сей день остаются уделом либералов, которые жаждут быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Предварительные выводы неутешительны: синтетическое тестирование требует анализа дальнейших направлений развития.'
const InputMessage = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {

    const [value, setValue] = useState(fish)
    const inputRef = React.createRef()

    return (
        <div className={style.input} ref={inputRef}
            contentEditable
        >
            value
        </div>
    )
}

export default InputMessage