import React, { useState } from "react";
import { ChildrenType } from "../../helpers/propTypes";
import PropTypes from "prop-types";
import TabContent from "./tabContent/TabContent";
import TabNav from "./tabNav/TabNav";
import { clamp } from "../../helpers/numeric";
import { removeSpecialChars } from "../../helpers/strings";

export default function Tabs({ tabs = [] }) {
	const [ active, setActive ] = useState(0);

	const changeTab = (tab) => {
		setActive(clamp(tab, 0, tabs.length));
	};

	const isActive = (tab) => tab === active;

	return (
		<section>
			<TabNav changeTab={changeTab} isActive={isActive} tabs={tabs} />
			{tabs.map((tab, index) => (
				<TabContent isActive={isActive(index)} key={removeSpecialChars(tab.id)}>
					{tab.content}
				</TabContent>
			))}
		</section>
	);
}

Tabs.defaultProps = {
	tabs: []
};

Tabs.propTypes = {
	tabs: PropTypes.arrayOf(PropTypes.objectOf({
		content: ChildrenType.isRequired,
		id: PropTypes.string.isRequired,
		name: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]).isRequired
	}))
};