<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"><xsl:output method="html" />
<xsl:template match="Table">
NewsID: <xsl:value-of disable-output-escaping="yes" select="NewsID"/><br />
News Title: <xsl:value-of disable-output-escaping="yes" select="NewsTitle"/><br />
News Summary: <xsl:value-of disable-output-escaping="yes" select="NewsSummary"/><br />
News Text: <xsl:value-of disable-output-escaping="yes" select="NewsText"/><br />
Release Date: <xsl:value-of disable-output-escaping="yes" select="NewsReleaseDate"/><br />
</xsl:template>
</xsl:stylesheet>
