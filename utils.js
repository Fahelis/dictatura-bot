module.exports = {

	isDirector: function(member)
	{
		if(!(null !== member.roles.find('name', 'Meneur') || null !== member.roles.find('name', 'Bras droits'))) {
			return false;
		}
		return true;
	}
}