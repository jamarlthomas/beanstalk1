using System;
using System.Web.UI.WebControls;

using CMS.Base;
using CMS.DataEngine;
using CMS.EmailEngine;
using CMS.ExtendedControls;
using CMS.ExtendedControls.ActionsConfig;
using CMS.Helpers;
using CMS.UIControls;

public partial class CMSModules_EmailQueue_EmailQueue : GlobalAdminPage
{
    #region "Variables"

    protected int siteId;

    #endregion


    #region "Page events"

    protected void Page_Load(object sender, EventArgs e)
    {
        Title = GetString("emailqueue.queue.title");
        siteId = QueryHelper.GetInteger("siteid", -1);

        // Display disabled information      
        ucDisabledModule.SettingsKeys = "CMSEmailsEnabled";
        ucDisabledModule.InfoText = GetString("emailqueue.emailsdisabled");

        // Load drop-down lists
        if (!RequestHelper.IsPostBack())
        {
            InitializeFilterDropdowns();

            btnShowFilter.Text = icShowFilter.AlternativeText = GetString("emailqueue.displayfilter");
        }

        gridEmailQueue.EmailGrid.WhereCondition = GetWhereCondition();

        if (EmailHelper.Queue.SendingInProgess)
        {
            ShowInformation(GetString("emailqueue.sendingemails"));
        }

        // Initialize top menu
        InitializeActionMenu();
    }

    #endregion


    #region "Private methods"

    /// <summary>
    /// Initializes action menu in master page.
    /// </summary>
    protected void InitializeActionMenu()
    {
        bool sending = EmailHelper.Queue.SendingInProgess;

        HeaderActions actions = CurrentMaster.HeaderActions;
        actions.ActionsList.Clear();

        string confirmScript = "if (!confirm({0})) return false;";

        // Resend all failed
        HeaderAction resendAction = new HeaderAction
        {
            Text = GetString("emailqueue.queue.resendfailed"),
            OnClientClick = !sending ? string.Format(confirmScript, ScriptHelper.GetString(GetString("EmailQueue.ResendAllFailedConfirmation"))) : null,
            CommandName = "resendallfailed",
            Enabled = !sending
        };
        actions.ActionsList.Add(resendAction);

        // Resend selected
        resendAction.AlternativeActions.Add(new HeaderAction
        {
            Text = GetString("emailqueue.queue.resendselected"),
            OnClientClick = !sending ? string.Format(confirmScript, ScriptHelper.GetString(GetString("EmailQueue.ResendSelectedConfirmation"))) : null,
            CommandName = "resendselected",
            Enabled = !sending
        });

        // Resend all
        resendAction.AlternativeActions.Add(new HeaderAction
        {
            Text = GetString("emailqueue.queue.resend"),
            OnClientClick = !sending ? string.Format(confirmScript, ScriptHelper.GetString(GetString("EmailQueue.ResendAllConfirmation"))) : null,
            CommandName = "resendall",
            Enabled = !sending
        });
        
        // Delete all failed
        HeaderAction deleteAction = new HeaderAction
        {
            Text = GetString("emailqueue.queue.deletefailed"),
            OnClientClick = !sending ? string.Format(confirmScript, ScriptHelper.GetString(GetString("EmailQueue.DeleteAllFailedConfirmation"))) : null,
            CommandName = "deleteallfailed",
            Enabled = !sending
        };
        actions.ActionsList.Add(deleteAction);

        // Delete selected
        deleteAction.AlternativeActions.Add(new HeaderAction
        {
            Text = GetString("emailqueue.queue.deleteselected"),
            OnClientClick = !sending ? string.Format(confirmScript, ScriptHelper.GetString(GetString("EmailQueue.DeleteSelectedConfirmation"))) : null,
            CommandName = "deleteselected",
            Enabled = !sending
        });

        // Delete all
        deleteAction.AlternativeActions.Add(new HeaderAction
        {
            Text = GetString("emailqueue.queue.delete"),
            OnClientClick = !sending ? string.Format(confirmScript, ScriptHelper.GetString(GetString("EmailQueue.DeleteAllConfirmation"))) : null,
            CommandName = "deleteall",
            Enabled = !sending
        });

        // Stop send
        actions.ActionsList.Add(new HeaderAction
        {
            Text = GetString("emailqueue.queue.stop"),
            OnClientClick = sending ? string.Format(confirmScript, ScriptHelper.GetString(GetString("EmailQueue.StopConfirmation"))) : null,
            CommandName = "stop",
            Enabled = sending
        });

        // Refresh
        actions.ActionsList.Add(new HeaderAction
        {
            Text = GetString("general.refresh"),
            CommandName = "refresh"
        });

        actions.ActionPerformed += HeaderActions_ActionPerformed;
    }


    private void InitializeFilterDropdowns()
    {
        drpPriority.Items.Add(new ListItem(GetString("general.selectall"), "-1"));
        drpPriority.Items.Add(new ListItem(GetString("emailpriority.low"), EmailPriorityEnum.Low.ToString("D")));
        drpPriority.Items.Add(new ListItem(GetString("emailpriority.normal"), EmailPriorityEnum.Normal.ToString("D")));
        drpPriority.Items.Add(new ListItem(GetString("emailpriority.high"), EmailPriorityEnum.High.ToString("D")));

        drpStatus.Items.Add(new ListItem(GetString("general.selectall"), "-1"));
        drpStatus.Items.Add(new ListItem(GetString("emailstatus.created"), EmailStatusEnum.Created.ToString("D")));
        drpStatus.Items.Add(new ListItem(GetString("emailstatus.sending"), EmailStatusEnum.Sending.ToString("D")));
        drpStatus.Items.Add(new ListItem(GetString("emailstatus.waiting"), EmailStatusEnum.Waiting.ToString("D")));
    }

    #endregion


    #region "Button events"

    /// <summary>
    /// Displays/hides filter.
    /// </summary>
    protected void btnShowFilter_Click(object sender, EventArgs e)
    {
        // Hide filter
        if (plcFilter.Visible)
        {
            plcFilter.Visible = false;
            btnShowFilter.Text = icShowFilter.AlternativeText = GetString("emailqueue.displayfilter");
            icShowFilter.CssClass = "icon-caret-down cms-icon-30";
        }
        // Display filter
        else
        {
            plcFilter.Visible = true;
            btnShowFilter.Text = icShowFilter.AlternativeText = GetString("emailqueue.hidefilter");
            icShowFilter.CssClass = "icon-caret-up cms-icon-30";
        }
    }


    /// <summary>
    /// Filter button clicked.
    /// </summary>
    protected void btnFilter_Clicked(object sender, EventArgs e)
    {
        gridEmailQueue.EmailGrid.WhereCondition = GetWhereCondition();
    }

    #endregion


    #region "Header action event"

    private void HeaderActions_ActionPerformed(object sender, CommandEventArgs e)
    {
        bool reloaded = true;

        switch (e.CommandName.ToLowerCSafe())
        {
            case "resendallfailed":
                EmailHelper.Queue.SendAllFailed();
                ShowInformation(GetString("emailqueue.sendingemails"));
                break;

            case "resendselected":
                EmailHelper.Queue.Send(gridEmailQueue.GetSelectedEmailIDs());
                gridEmailQueue.EmailGrid.ResetSelection();
                ShowInformation(GetString("emailqueue.sendingemails"));

                break;

            case "resendall":
                EmailHelper.Queue.SendAll();
                ShowInformation(GetString("emailqueue.sendingemails"));

                break;

            case "deleteallfailed":
                EmailHelper.Queue.DeleteAllFailed(siteId);
                break;

            case "deleteselected":
                EmailHelper.Queue.Delete(gridEmailQueue.GetSelectedEmailIDs());
                gridEmailQueue.EmailGrid.ResetSelection();
                break;

            case "deleteall":
                EmailHelper.Queue.DeleteAll(siteId);
                break;

            case "stop":
                EmailHelper.Queue.CancelSending();
                break;

            case "refresh":
                reloaded = false;
                break;
        }

        gridEmailQueue.ReloadData();

        // Reload on first page if no data found after performing action
        if (reloaded && DataHelper.DataSourceIsEmpty(gridEmailQueue.EmailGrid.GridView.DataSource))
        {
            gridEmailQueue.EmailGrid.Pager.UniPager.CurrentPage = 1;
            gridEmailQueue.ReloadData();
        }
    }

    #endregion


    #region "Filter methods"

    /// <summary>
    /// Returns WHERE condition.
    /// </summary>
    protected string GetWhereCondition()
    {
        string where = string.Empty;

        where = SqlHelper.AddWhereCondition(where, fltFrom.GetCondition());
        where = SqlHelper.AddWhereCondition(where, fltSubject.GetCondition());
        where = SqlHelper.AddWhereCondition(where, fltBody.GetCondition());
        where = SqlHelper.AddWhereCondition(where, fltLastResult.GetCondition());

        // EmailTo condition
        string emailTo = fltTo.FilterText.Trim();
        if (!String.IsNullOrEmpty(emailTo))
        {
            if (!String.IsNullOrEmpty(where))
            {
                where += " AND ";
            }
            string toText = SqlHelper.EscapeQuotes(emailTo);
            string op = fltTo.FilterOperator;
            if (op.Contains(WhereBuilder.LIKE))
            {
                toText = "%" + SqlHelper.EscapeLikeText(toText) + "%";
            }
            toText = " N'" + toText + "'";
            string combineOp = " OR ";
            bool includeNullCondition = false;
            if ((op == "<>") || op.Contains("NOT"))
            {
                combineOp = " AND ";
                includeNullCondition = true;
            }
            where += string.Format("(EmailTo {0}{1}{2}(EmailCc {0}{1}{3}){2}(EmailBcc {0}{1}{4}))",
                                   op, toText, combineOp, includeNullCondition ? " OR EmailCc IS NULL" : string.Empty, includeNullCondition ? " OR EmailBcc IS NULL" : string.Empty);
        }

        // Condition for priority
        int priority = ValidationHelper.GetInteger(drpPriority.SelectedValue, -1);
        if (priority >= 0)
        {
            if (!String.IsNullOrEmpty(where))
            {
                where += " AND ";
            }
            where += "EmailPriority=" + priority;
        }

        // Condition for e-mail status
        int status = ValidationHelper.GetInteger(drpStatus.SelectedValue, -1);
        if (status >= 0)
        {
            if (!string.IsNullOrEmpty(where))
            {
                where += " AND ";
            }

            where += "EmailStatus=" + drpStatus.SelectedValue;
        }

        // Condition for site
        if (!string.IsNullOrEmpty(where))
        {
            where += " AND ";
        }
        where += string.Format("(NOT EmailStatus = {0:D})", EmailStatusEnum.Archived);

        if (siteId == UniSelector.US_GLOBAL_RECORD)
        {
            // Global
            where += " AND (EmailSiteID IS NULL OR  EmailSiteID = 0)";
        }
        else if (siteId > 0)
        {
            where += string.Format(" AND (EmailSiteID = {0})", siteId);
        }

        return where;
    }

    #endregion
}